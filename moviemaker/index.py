import sys
import random
import hex

script_file = open(sys.argv[1], "r")
script = script_file.readlines()
glue = open(sys.argv[3], "r").readlines()
declared_els = []
declared_vars = {}
output = []
output_path = sys.argv[2]
stg_curr_ids = []
in_stg = False

def exec_macro(val_decl: str):
    if val_decl.startswith("rand-range->"):
        val_decl = val_decl.removeprefix("rand-range->")
        [f, to] = val_decl.split(":")
        [to, unit] = to.split(".")
        return f"{random.randrange(int(f), int(to))}{unit}"
    elif val_decl.startswith("stg-var->"):
        val_name = val_decl.removeprefix("stg-var->")
        stg_vars_dict = {}
        for id in stg_curr_ids:
            stg_vars_dict[id] = declared_vars[f"{val_name}-{id}"]
        return stg_vars_dict
    elif val_decl.startswith("rand-hex->"):
        val_decl = val_decl.removeprefix("rand-hex->")
        [a, b] = val_decl.split(":")
        return hex.generate_random_hex_color(a, b)
    return val_decl

# Replace a variable caller by it's value or macro
def if_var_replace(val_decl):
    if val_decl[0] == "$":
        val_decl = val_decl.removeprefix("$")
        if declared_vars.get(val_decl) != None:
            return declared_vars.get(val_decl)
    return exec_macro(val_decl)

for line in script:
    line = line.removesuffix("\n").strip()
    [instr, *v] = line.split(" ")


    if instr == "el" and declared_els.__contains__(v[0]) == False:
        declared_els.append(v[0])
        output.append(f"const {v[0]} = document.createElement('{v[1]}');")
    elif instr == "var":
        v[1] = if_var_replace(v[1])
        declared_vars[v[0]] = v[1]
    elif instr == "sty":
        v[1] = if_var_replace(v[1])
        v[2] = if_var_replace(" ".join(v[2:]))
        output.append(f"st({v[0]}, '{v[1]}', '{v[2]}');")
    elif instr == "stg":
        if v[0] == "END":
            stg_curr_id = []
            in_stg = False
        else:
            in_stg = True
            stg_curr_ids = v[0:]
    elif instr == "addch":
        ids = v[1:]
        for id in ids:
            output.append(f"ps({id}, '{v[0]}');")
    elif instr == "plx":
        [from_s, to_s] = v[1].split(":")
        [from_scr, to_scr] = v[4].split(":")
        output.append(
            f"plx({v[0]}, {from_s}, {to_s}, '{v[2]}', '{v[3]}', {from_scr}, {to_scr})"
        )
    elif instr == "wait":
        duration = v[0]
        output.append(f"await wait({duration});")
    elif instr == "stp":
        v[1] = if_var_replace(v[1])
        v[2] = if_var_replace(v[2])
        output.append(f"stp({v[0]}, '{v[1]}', {v[2]})")
    elif instr == "text":
        v[1] = if_var_replace(" ".join(v[1:]))
        output.append(f"text({v[0]}, {v[1]})")
    elif in_stg and instr == "stg-var":
        for id in stg_curr_ids:
            name = v[0]
            val = if_var_replace(v[1])
            declared_vars[f"{name}-{id}"] = val
    elif in_stg:
        v[0] = " ".join(v)
        for id in stg_curr_ids:
            instr = if_var_replace(instr)
            var = if_var_replace(v[0])
            if v[0].startswith("stg-var"):
                var = var[id]
            output.append(f"st({id}, '{instr}', '{var}');")

output_str = "".join(glue) + "\n" + "\n".join(output);
out_file = open(output_path, "w")
out_file.write(output_str)
