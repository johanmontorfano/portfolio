import random

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(rgb_color):
    return '#{:02x}{:02x}{:02x}'.format(*rgb_color)

def generate_random_hex_color(start_hex, end_hex):
    start_rgb = hex_to_rgb(start_hex)
    end_rgb = hex_to_rgb(end_hex)
    
    random_rgb = tuple(random.randint(start, end) for start, end in zip(start_rgb, end_rgb))
    
    return rgb_to_hex(random_rgb)
