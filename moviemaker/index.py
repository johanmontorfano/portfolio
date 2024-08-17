import sys

script_file = open(sys.argv[1], "r")
script = script_file.readlines()
glue = open(sys.argv[3], "r").readlines()
declared_els = []
declared_vars = {}
output = []
output_path = sys.argv[2]
stg_curr_ids = []
in_stg = False

# Replace a variable caller by it's value
def if_var_replace(val_decl):
    if val_decl[0] == "$":
        if declared_vars.get(val_decl) != None:
            return declared_vars.get(val_decl)
    return val_decl

for line in script:
    line = line.removesuffix("\n")
    [instr, *v] = line.split(" ")


    if instr == "el" and declared_els.__contains__(v[0]) == False:
        declared_els.append(v[0])
        output.append(f"const {v[0]} = document.createElement('{v[1]}');")
    elif instr == "var":
        declared_vars[f"${v[0]}"] = v[1]
    elif instr == "sty":
        v[1] = if_var_replace(v[1])
        v[2] = if_var_replace(v[2])
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
    elif in_stg:
        for id in stg_curr_ids:
            instr = if_var_replace(instr)
            v[0] = if_var_replace(v[0])
            output.append(f"st({id}, '{instr}', '{v[0]}');")

output_str = "".join(glue) + "\n" + "\n".join(output);
out_file = open(output_path, "w")
out_file.write(output_str)
