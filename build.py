import os, json

# Folders to ignore when scanning for sites
IGNORE = {"api", "node_modules", ".git", ".vercel", "public", ".github"}

sites = sorted([
    name for name in os.listdir(".")
    if os.path.isdir(name)
    and not name.startswith(".")
    and name not in IGNORE
    and os.path.exists(os.path.join(name, "index.html"))
])

with open("sites.json", "w") as f:
    json.dump(sites, f, indent=2)

print(f"Found {len(sites)} sites: {sites}")
