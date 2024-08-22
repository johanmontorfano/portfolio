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
in_for = False
in_js = False

def exec_macro(val_decl: str):
    if val_decl.startswith("rand-range->"):
        val_decl = val_decl.removeprefix("rand-range->")
        [f, to] = val_decl.split(":", maxsplit=1)
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
        [a, b] = val_decl.split(":", maxsplit=1)
        return hex.generate_random_hex_color(a, b)
    elif val_decl.startswith("json-get->"):
        val_decl = val_decl.removeprefix("json-get->")
        return f"await(await fetch('{val_decl}')).json()"
    elif val_decl.startswith("for-item->"):
        val_decl = val_decl.removeprefix("for-item->")
        if val_decl == "@":
            return "item"
        elif val_decl == "index":
            return "index"
        else:
            return f"item.{val_decl}"
    elif val_decl.startswith("rconcat->"):
        val_decl = val_decl.removeprefix("rconcat->")
        [a, b] = val_decl.split(":", maxsplit=1)
        a = if_var_replace(a)
        b = if_var_replace(b)
        return f"{a} + {b}"
    return val_decl

# Replace a variable caller by it's value or macro
def if_var_replace(val_decl):
    if val_decl[0] == "$":
        val_decl = val_decl.removeprefix("$")
        if declared_vars.get(val_decl) != None:
            return declared_vars.get(val_decl)
    elif val_decl[0] == "@":
        return val_decl.removeprefix("@")
    return exec_macro(val_decl)

for line in script:
    line = line.removesuffix("\n").strip()
    [instr, *v] = line.split(" ")

    if in_js == True and instr != "js" and len(v) < 1:
        output.append(line)
    elif instr == "el" and declared_els.__contains__(v[0]) == False:
        declared_els.append(v[0])
        output.append(f"const {v[0]} = document.createElement('{v[1]}');")
    elif instr == "gel" and declared_els.__contains__(v[0]) == False:
        declared_els.append(v[0])
        output.append(f"const {v[0]} = document.querySelectorAll('{v[1]}')[0]")
    elif instr == "var":
        v[0] = if_var_replace(v[0])
        v[1] = if_var_replace(v[1])
        declared_vars[v[0]] = v[1]
    elif instr == "rvar":
        v[0] = if_var_replace(v[0])
        v[1] = if_var_replace(v[1])
        output.append(f"let {v[0]} = {v[1]};")
    elif instr == "for":
        if v[0] == "END":
            in_for = False
            output.append("});")
        else:
            in_for = True
            v[0] = if_var_replace(v[0])
            output.append(f"{v[0]}.forEach((item, index) => {{")
    elif instr == "sty":
        v[1] = if_var_replace(v[1])
        v[2] = if_var_replace(" ".join(v[2:]))
        output.append(f"st({v[0]}, '{v[1]}', '{v[2]}');")
    elif instr == "styplxa":
        v[1] = if_var_replace(v[1])
        v[2] = if_var_replace(v[2])
        v[3] = if_var_replace(" ".join(v[3:]))
        output.append(f"styplxafter({v[0]}, '{v[1]}', '{v[3]}', {v[2]});")
    elif instr == "styplxb":
        v[1] = if_var_replace(v[1])
        v[2] = if_var_replace(v[2])
        v[3] = if_var_replace(" ".join(v[3:]))
        output.append(f"styplxbefore({v[0]}, '{v[1]}', '{v[3]}', {v[2]});")
    elif instr == "stg":
        if v[0] == "END":
            stg_curr_id = []
            in_stg = False
        else:
            in_stg = True
            stg_curr_ids = v[0:]
    elif instr == "addch":
        selector = if_var_replace(v[0])
        ids = v[1:]
        for id in ids:
            if selector == v[0]:
                output.append(f"ps({id}, '{selector}')")
            else:
                output.append(f"ps({id}, {selector})")
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
        in_js = False
    elif instr == "js":
        in_js = len(v) < 1
    elif instr == "jsl":
        rawjs = " ".join(v)
        output.append(rawjs)
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
