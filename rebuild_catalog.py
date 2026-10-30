import re

path = "/root/ClubeMkt/sanjuan/src/lib/sanjuan-catalog.ts"
s = open(path).read()

# Confirm exact pattern present
needle = "stock: 40 },"
print("needle present:", needle in s)

# Simpler global replace of 'stock: N },' with 'stock: N, material: "N/A", featured: false }'
count = s.count(" },")
print("occurrences of ' },':", count)

# Do actual replacement: find all "stock: N }," patterns
new, n = re.subn(r"stock: (\d+), \}\s*\n\s*\",\"?id", r"stock: \1, material: \"N/A\", featured: false },\n    \"id", s)
print("subn replacements:", n)
open(path, "w").write(new)
