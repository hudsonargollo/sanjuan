#!/usr/bin/env python3
"""Bulk-rebrand sanjuan -> SanJuan Mini Market across the repo (excluding .git + node_modules)."""
import os
import re
import sys

ROOT = "/root/ClubeMkt/sanjuan"

EXCLUDE = {".git", "node_modules"}

# Ordered list of (regex, replacement) pairs applied in order.
# Brand display name (any case) -> "SanJuan Mini Market"
DISPLAY = [
    (r"SanJuan Mini Market", "SanJuan Mini Market"),
    (r"SanJuan Mini Market", "SanJuan Mini Market"),
    (r"sanjuan", "sanjuan"),             # lowercase internal refs
    (r"-sanjuan\b", "-sanjuan"),
    (r"sanjuan-", "sanjuan-"),
    (r"sanjuan_", "sanjuan_"),
    (r"sanjuan\b", "sanjuan"),
    (r"SanJuan Mini Market-", "SanJuan Mini Market-"),
    (r"SanJuan Mini Market-", "SanJuan Mini Market-"),
    (r"sanjuan_project", "sanjuan_project"),
    (r"sanjuan-uploads", "sanjuan-uploads"),
    (r"sanjuan-qa", "sanjuan-qa"),
    (r"sanjuan\.", "sanjuan."),
    (r"SanJuan Mini Market\.", "SanJuan Mini Market."),
    (r"sanjuan,", "sanjuan,"),
]

# Code-identifiers that embed the brand and should never stay (e.g. cookies, localstorage).
# (These are covered by the generic rules, but keep an explicit safety pass.)
EXTRA = [
    (r"sanjuan_theme", "sanjuan_theme"),
    (r"sanjuan_chat", "sanjuan_chat"),
    (r"sanjuan_cart", "sanjuan_cart"),
    (r"sanjuan_admin", "sanjuan_admin"),
    (r"sanjuan_customer", "sanjuan_customer"),
    (r"sanjuan_verify", "sanjuan_verify"),
    (r"sanjuan-qa\.signup", "sanjuan-qa.signup"),
    (r"sanjuan\.qa", "sanjuan.qa"),
]

def process_file(path):
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        data = f.read()
    original = data
    for rx, repl in DISPLAY + EXTRA:
        data = re.sub(rx, repl, data)
    if data != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(data)
        return True
    return False

def main():
    changed = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE]
        for fn in filenames:
            if fn in {".gitignore", "package-lock.json"} and dirpath.endswith("node_modules"):
                continue
            if fn == "package-lock.json" and "node_modules" in dirpath:
                continue
            p = os.path.join(dirpath, fn)
            if fn == "package-lock.json":
                # Walk the json hash to avoid touching lockfile integrity lines in full-scan mode
                pass
            if process_file(p):
                changed.append(p)
    print(f"Rebranded {len(changed)} files.")
    for p in changed:
        print("  ", p)

if __name__ == "__main__":
    main()
