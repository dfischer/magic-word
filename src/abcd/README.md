Analyze, normalize, and otherwise manipulate ABCD.

The main data structure related to ABCD from the Awelon project is the
*dictionary*: essentially a key-value store mapping names to blocks,
with efficient manipulation of group of keys by their prefix.

The guiding concept behind acceleration is
[*arithmetic*](http://typedefs.org): sums, products, exponentials are
recognized and accelerated, and therefore data structures made of
these types have reasonable performance.
