# Documentation

## Chapter References

## Character

### Dataset

Character dataset are written in yml documents and stored in `data/characters`.

### Relationships

Parental relationships should always be directed from the child. Characters should not contain references to their children in their dataset.

Wherever a uniform example of one-to-many relationships is found, always direct toward the one from each of the many. Do not go from one toward its many. Spouses are an example of this where there are no cases of a many-to-many. Generally, we will direct from the wife to the husband, as there are more occurrence of men with many wives, allowing for some uniformity in the datasets. This also means that in cases where the relationship is one-to-one, only the wife would have a spouse reference. This is done purely to optimize on the grep search and will be opaque to the end-user.  

## TimeAndPlace

`TimeAndPlace` types contain information related to the time and place of an event. The `year` data points are based on rough dating by scholars and should all be assumed to be circa. For items that are more controversial or don't bear dating (such as Adam's creation or Job's birth), years are omitted altogether. `TimeAndPlace` types also contain a `chapterRef`. This is a Bible Things [chapter reference](#chapter-references) of the first canonical appearance of this event in the text. 

With respect to `chapterRef` deaths should only be inferred when in a genealogical record some variant of the phrase "and he lived _x_ years" and when there is no later canonical account referencing a death either narratively or genealogically.

Similarly, births may always be inferred from the first canonical appearance in a genealogical record (when the first account isn't narrative), but should never be inferred from a character's first appearance (such as with Adah and Zillah or Melchizedek).
