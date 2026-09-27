# Franchises Plan

Build a dedicated area of the website for exploring large fictional franchises as structured, filterable timelines and catalogues.

The initial concept is to support franchises such as **Star Wars**, **Doctor Who**, **Star Trek**, and the **Marvel Cinematic Universe (MCU)**. The system should be designed around reusable franchise data rather than hard-coding a separate page for each franchise.

The goal is not simply to reproduce an existing watch-order list. The interesting part of the project is combining structured franchise data with useful filtering, chronology, release order, character relationships, and visualisation.

## Goals

- Provide a useful way to explore a large fictional universe.
- Show both release order and in-universe chronological order.
- Allow filtering by characters and other useful metadata.
- Make individual films, series, seasons, specials, and episodes independently discoverable.
- Build a reusable data model that can support franchises with very different structures and chronologies.
- Make the data and relationships useful for both conventional catalogue views and richer timeline visualisations.
- Keep the initial implementation manageable while leaving room for additional franchises and features.

## Initial Franchises

Start with a small selection of franchises that demonstrate different kinds of chronology and media structure:

- **Star Wars**
- **Doctor Who**
- **Star Trek**
- **Marvel Cinematic Universe**

The exact order in which franchises are added should be decided during implementation based on data availability and the usefulness of the resulting dataset.

## Core Catalogue

Each franchise should have a catalogue of its relevant media entries.

Potential entry types include:

- Films.
- TV series.
- Seasons.
- Individual episodes.
- Specials.
- Animated series and episodes.
- Other significant canonical screen content where appropriate.

Each entry should be represented as structured data rather than embedded directly in UI components.

Useful metadata may include:

- Title.
- Franchise.
- Type.
- Release date.
- In-universe date or chronological position.
- Season/series information.
- Episode number where applicable.
- Characters appearing in the entry.
- Canon/status information where meaningful.
- Parent/related entries.
- Notes or caveats where chronology is ambiguous.

Not every field will apply cleanly to every franchise. The data model should allow franchise-specific differences without forcing everything into an artificial universal structure.

## Ordering

The catalogue should support at least two primary orderings:

### Release Order

Show content in the order it was originally released or broadcast.

This should be the default chronological interpretation for release dates, while still allowing the underlying data to represent precise release information where necessary.

### In-Universe Chronological Order

Show content according to when its events occur within the fictional universe.

This should not assume that chronology can always be represented by a single date. Some franchises contain overlapping stories, flashbacks, time travel, alternate timelines, or deliberately ambiguous chronology.

The data model should therefore allow a chronological position to be represented with enough structure to handle these cases rather than relying exclusively on a timestamp.

Where chronology is disputed or approximate, the UI should make that clear rather than presenting an uncertain ordering as definitive.

## Filtering and Search

The main catalogue/timeline should support useful filters such as:

- Character.
- Multiple characters.
- Content type.
- Series/era.
- Release period.
- In-universe period.
- Canon/status where applicable.

Character filtering should be relationship-based: selecting a character should return the entries in which that character appears according to the project's data.

Multiple-character filtering should support useful combinations such as:

- Entries containing **any** selected character.
- Entries containing **all** selected characters.

Provide text search for titles and other useful metadata.

Filters should be composable rather than creating separate pages for every possible query.

## Character Data

Characters should be first-class entities in the data model rather than plain strings attached to entries.

A character record can contain information such as:

- Name.
- Franchise.
- Aliases where useful.
- Relationships to catalogue entries.
- Optional metadata for display.

The important relationship is the appearance between a character and an entry. This allows queries such as:

- Everything featuring a particular character.
- Everything featuring two characters together.
- Characters appearing in a particular episode.
- The first/last appearance of a character within a selected catalogue.

Character identity should be stable even if a character has multiple names, aliases, or incarnations.

## Timeline UI

The primary presentation should go beyond a basic table where practical.

Potential views include:

- A conventional sortable/filterable catalogue.
- A release-order timeline.
- An in-universe chronological timeline.
- A character-focused timeline showing where selected characters appear.

The timeline should make it easy to move between a compact overview and detailed information for an individual entry.

Potential interactions include:

- Selecting an entry to open its details.
- Selecting a character to filter the catalogue.
- Switching between release and chronological ordering.
- Zooming or changing the visible time/era range if a timeline visualisation warrants it.

The first implementation should prioritise a clear, usable catalogue/timeline over an overly ambitious visualisation.

## Individual Entry Pages

Each significant entry should have a dedicated detail view containing its available metadata.

For example:

**Doctor Who — Series 4, Episode 10**

- Title.
- Broadcast/release information.
- Chronological position.
- Characters.
- Series/season.
- Previous/next entries.
- Related entries.

Individual entries should link naturally back into the relevant franchise timeline and filtered views.

## Franchise Pages

Each franchise should have its own landing page.

A franchise page could provide:

- Franchise description.
- Main catalogue.
- Release-order view.
- Chronological-order view.
- Character browser.
- Era/series filters.
- Links to notable entries.

The franchise page should be generated from the structured data rather than requiring a bespoke implementation for each franchise.

## Data Architecture

The data should be treated as a first-class part of the project.

A useful conceptual model is:

```
Franchise
├── Entries
│   ├── Film
│   ├── Series
│   │   └── Episode
│   └── Special
└── Characters
    └── Appearances → Entries
```

The actual implementation should use a model capable of representing:

- Parent/child relationships between series, seasons, and episodes.
- Release dates and broadcast order.
- In-universe chronology.
- Character appearances.
- Related entries.
- Alternate or ambiguous chronology where required.

A database is not necessarily required for the first version. The initial dataset could live as structured, version-controlled data, provided it can be queried efficiently and validated.

If the dataset becomes large enough to justify a database, the data model should make that transition possible without redesigning the user-facing concepts.

## Data Quality and Validation

Data quality is likely to be one of the most significant challenges of this project.

The implementation should include validation for things such as:

- Duplicate entries.
- Invalid relationships.
- Missing required metadata.
- Invalid parent/child relationships.
- Character references to nonexistent entries.
- Impossible or malformed dates.
- Invalid ordering relationships.

Where chronology is disputed, approximate, or franchise-specific, represent that uncertainty explicitly.

The project should distinguish between factual data, calculated ordering, and editorial decisions about how ambiguous material is represented.

## Canon and Continuity

Different franchises have different approaches to canon, continuity, alternate timelines, and expanded material.

The initial version should avoid trying to model every possible continuity system. Instead, the data model should leave room for:

- Canon/status labels.
- Continuity or timeline identifiers.
- Alternate versions where necessary.
- Relationships between related or conflicting entries.

Franchise-specific rules should live in the data/model layer rather than being scattered through the UI.

## Potential Future Features

Once the core catalogue is reliable, useful extensions could include:

- Watchlist/progress tracking.
- Hide content already watched.
- "What should I watch next?" views.
- Character appearance histories.
- Character co-appearance analysis.
- Timeline comparison between characters.
- Era-based navigation.
- Franchise-wide statistics.
- Cross-franchise search.
- Shareable filtered views.
- More detailed relationship graphs.

Persistent watch history should be considered separately from the initial read-only catalogue. The first version should not depend on user accounts or persistence.

## Implementation Approach

The first release should be deliberately smaller than the complete vision.

A sensible initial slice would be:

1. Build the shared franchise data model.
2. Add one franchise with a meaningful amount of structured data.
3. Build the catalogue and release/chronological ordering.
4. Add character relationships and character filtering.
5. Add individual entry details.
6. Add a second franchise to prove that the model is genuinely reusable.
7. Improve the timeline visualisation once the underlying data model has been exercised.

This should expose weaknesses in the data model before a large amount of franchise-specific data is entered.

## Open Decisions

- Exactly which media types should count as catalogue entries?
- How should time travel and alternate timelines be represented?
- How should uncertain or disputed chronology be displayed?
- How should canon and continuity be represented across franchises?
- What data source(s) will be used, and what licensing/attribution requirements apply?
- Should the initial dataset be static/version-controlled or backed by a database?
- How much character metadata is useful before the project becomes an encyclopaedia?
- What should the first timeline visualisation look like?
- Should watch progress eventually be stored locally, server-side, or not at all?