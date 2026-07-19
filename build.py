import os, json

# --- Site list (used by the "Sites" switcher panel) ---

IGNORE = {"api", "node_modules", ".git", ".vercel", "public", ".github"}

sites = []
for name in sorted(os.listdir(".")):
    if (os.path.isdir(name)
        and not name.startswith(".")
        and name not in IGNORE
        and os.path.exists(os.path.join(name, "index.html"))):
        sites.append({"name": name, "url": f"/{name}/"})

with open("sites.json", "w") as f:
    json.dump(sites, f, indent=2)

print(f"Found {len(sites)} sites: {[s['name'] for s in sites]}")


# --- Full repo tree (used by the "Code" viewer panel) ---

TREE_IGNORE_DIRS = {
    ".git", ".github", ".vercel", ".vscode",
    ".devcontainer", ".codespaces", "node_modules", "__pycache__"
}
TREE_IGNORE_FILES = {"sites.json", "repo-tree.json"}

def build_tree(path):
    entries = []
    names = sorted(os.listdir(path), key=str.lower)

    dirs = [
        n for n in names
        if os.path.isdir(os.path.join(path, n))
        and n not in TREE_IGNORE_DIRS
        and not n.startswith(".")
    ]
    files = [
        n for n in names
        if os.path.isfile(os.path.join(path, n))
        and n not in TREE_IGNORE_FILES
        and not n.startswith(".")
    ]

    for d in dirs:
        entries.append({
            "type": "folder",
            "name": d,
            "children": build_tree(os.path.join(path, d))
        })

    for fname in files:
        full = os.path.join(path, fname).replace("\\", "/")
        if full.startswith("./"):
            full = full[2:]
        entries.append({
            "type": "file",
            "name": fname,
            "path": "/" + full
        })

    return entries

tree = build_tree(".")
with open("repo-tree.json", "w") as f:
    json.dump(tree, f, indent=2)

print(f"Repo tree generated with {len(tree)} top-level entries")