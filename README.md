# Personal Project: Maze Solver

**Brief:**

This project allows a user to experiment with different path-finding algorithms by visualising/animating how different 
search algorithms seek a (perhaps optimal) route towards a goal (from a starting position) in a grid. This project was 
also used as a means to learn _React.js_ for creating web-based Graphical User Interfaces (GUIs).

Demo At: [https://NMPoole.github.io/MazeSolver/](https://NMPoole.github.io/MazeSolver/).

The user is able to select between different search algorithms:
1. Random Walk
2. Breadth-First Search
3. Depth-First Search
4. Dijkstra's Algorithm
5. A* Search
6. Greedy Best-First Search
7. Bidirectional Greedy Search

The user is able to place walls within the grid that the algorithms must account for, but more importantly, the user may 
generate mazes using different maze generation algorithms:
1. Random Generation
2. Horizontal Generation
3. Vertical Generation
4. Recursive Division Generation

**Demo Video:**

<p align="center">
  <img src="https://github.com/NMPoole/MazeSolver/blob/main/MazeSolver_Demo.gif" alt="Demo Video" width="70%" align="center"/>
</p>

**Project Goals:**

There were several goals to this project as a means for personal development:

1. Review previous concepts related to search algorithms: weighted search, unweighted search, heuristics, etc.
2. Learn new algorithms relating to maze generation.
3. Learn and practice web development with Javascript, namely by learning how to create good-looking interfaces and animations.
4. Practice the ability to visualise my work - previous projects are underwhelming in what they achieve due to the CLI.
5. Begin to learn and practice creating such interfaces with _React.js_.

**Project Motivation:**

Perusing YouTube one day, I found myself looking at Dev Blogs for personal projects
and came across this video by [Clément Mihailescu](https://www.youtube.com/watch?v=msttfIHHkak&ab_channel=Cl%C3%A9mentMihailescu).
Immediately, I thought to myself, "I've done this before extensively, better even, with more algorithms and research and 
analysis. However, my project work doesn't look this impressive". Indeed, my university work is impressive in the theory
it explores, but the average recruiter, employer, or fellow developer wouldn't be able to tell. CLIs are lack luster at 
showing off what a project does! Thus began my journey of marrying two key aspects: the review of previous theory from my 
degree, and learning web development to showcase this theory.

**Outcomes And Acknowledgments:**

The complexity of the project was underestimated! Learning _React.js_ was more difficult than initially expected and 
required a significant review and practice of _ES6_, _HTML_, and _CSS_. Meanwhile, I also took several detours to learn 
significant theory about _Next.js_ as a framework for _React.js_, common web tech stacks (such as MERN), etc.

In the end, I found that since the project idea was unoriginal, it would be beneficial and efficient to follow tutorials 
and examples for the idea instead of trying to re-invent the wheel. After all, the priority of the project was to learn
new skills about web UIs (via _React.js_). As such, I must acknowledge the great sources by 
[Clément Mihailescu](https://www.youtube.com/watch?v=msttfIHHkak&ab_channel=Cl%C3%A9mentMihailescu) and 
[Rohith S P](https://github.com/rohithaug/pathfinding-visualizer) as significant contributors to this project.

Overall, I feel that I would have been able to implement a project even more impressive with a technology I am already 
very familiar with, such as _P5.js_. However, I learned a great deal during this project and will endeavour to explore 
_React.js_ in future projects! In particular, I have implemented the project using the now dated practice of class-based 
UI components, since this complemented my dominant Java experience. However, in future projects I would like to 
explore the more modern functional component model with hooks.
