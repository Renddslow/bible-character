# Bible Things API

> A GraphQL API of various Bible things: characters, places, objects, and creatures, all with the beauty of a relational graph.

## Using the API

## Motivations

## Documentation

### TimeAndPlace

`TimeAndPlace` types contain information related to the time and place of an event. The `year` data points are based on rough dating by scholars and should all be assumed to be circa. For items that are more controversial or don't bear dating (such as Adam's creation or Job's birth), years are omitted altogether. `TimeAndPlace` types also contain a `chapterRef`. This is a Bible Things [chapter reference](#chapter-references) of the first canonical appearance of this event in the text. 

### Chapter References
