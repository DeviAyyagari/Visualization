# Visualization
Provides solution to the following problem:

# Front-end & Visualization Developer Tasks


## Task 1
_Goal: Demonstrate your ability to work with common collaboration tools for software development._

Create a public GitHub repository to share any code and documents that you will be writing for the tasks below.

## Task 2
_Goal: Demonstrate your ability to design and write web-based applications._

Create a browser-based JavaScript tool for interactive visualization of mutations in cancer. Your tool will retrieve data from an API provided by the Data Coordination Center of the International Cancer Genomics Consortium (http://dcc.icgc.org).

### Retrieve Data on Demand
When the visualization tool loads, it should obtain mutation data for the Glioblastoma multiforme project (GBM-US) from the mutations API endpoint of the ICGC Data Coordination Center. Retrieve mutation ids, mutation details, the type of the mutation, chromosome and start and end position for 100 mutations of the GBM-US project. Below is a query that illustrates how to retrieve 100 mutations:

```
https://dcc.icgc.org/api/v1/projects/GBM-US/mutations?field=id,mutation,type,chromosome,start,end&size=100&order=desc
```

### Provide an Overview of the Mutation Data
By default, the user interface should show two interactive visualizations: 

1. _Type Overview_: A visualization that shows the number of mutations for each mutation type.
2. _Chromosome Overview_: A visualization that shows the distribution of mutations across the 22 human autosome pairs plus the two sex chromosomes.

### Add Interactions and Filters
The types in the _Type Overview_ and chromosomes in the _Chromosome Overview_ should act as filters. Selecting a type or chromosome should filter the overall list of mutations to the subset that pass the filter and update the other view (e.g., if chromosome 17 is selected, the _Type Overview_ should only show the data for mutations on chromosome 17). Selecting an entry in both the _Chromosome Overview_ and the _Type Overview_ should be allowed and be treated like a logical AND. It should be possible to clear the filters.

### Optional
- Consider enhancements that could be made by color-coding mutation types.
- Summarize briefly how this system could be tested.
- Create a diagram that describes how the tool implemented above works. If you are unable to complete the implementation, this diagram should describe how you would have implemented the tool.

### Additional Considerations
- The D3.js visualization library is very powerful but you are free to chose whatever visualization libraries or components you think are most suitable to address the requirements.
- You don't have to reinvent the wheel but if you do so, it should be to demonstrate your coding skills.
