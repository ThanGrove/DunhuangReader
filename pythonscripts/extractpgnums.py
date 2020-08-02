#!/usr/bin/env python3

import os
import re

pgs = []
x = 0
lnct = 0
with open('/Users/thangrove/Box/Active/Personal/Projects/Research/Dunhuang/dhsite-p116-toc.html', 'r') as din:
    for ln in din:
        lnct += 1
        mtch = re.search(r'changeImages\(\'image(\d+)', ln)
        if mtch:
            pgs.append(mtch.group(1))
            x += 1

print("{} matches in {} lines".format(x, lnct))

with open('dunhuang-p116-pgnums.txt', 'w') as pout:
    for pn in pgs:
        pout.write("{}\n".format(pn))

print("Done!")
