# Puzzle
一款基于html5的网页小游戏  
a web game in html5  

网页截图如下  
the snapshot of the website  

开始页面  
start page  
![image](https://github.com/chenhuaizhen/Puzzle/raw/master/image/1.jpg)

通过键盘的上下左右控制格子移动，恢复格子1-15的顺序  
you have to use the "up/down/left/right" of the keyboard to recover the order of 1-15  

最终页面  
end page  
![image](https://github.com/chenhuaizhen/Puzzle/raw/master/image/2.jpg)

Tips按钮能够提供未来3步的走法，基于A\*算法求最短路径  
the tips button can provide the next 3 steps, which is based on the A\* search algorithm   

一开始step显示的是A\*算法求出的全局最优走法步数，之后会随着你的操作不断减一    
at first the step interface shows the lowest steps in thie game based on the A\* search algorithm, then it will continuously minus 1 according to your operate     
![image](https://github.com/chenhuaizhen/Puzzle/raw/master/image/3.jpg)

试完网址  
the test website  
[Number Puzzle](http://chenhuaizhen.applinzi.com/Number/)

# A* search algorithm
该程序维护一个步数表，其基本单位如下  
in this time it maintains a step list, its unit row like  
![image](https://github.com/chenhuaizhen/Puzzle/raw/master/image/4.jpg)

该基本单位运行中会不断插入历史信息（运动方向）  
the unit table will append the history information(the moving direction) during the running time  
![image](https://github.com/chenhuaizhen/Puzzle/raw/master/image/5.jpg)

每次迭代都会使用排序，筛选方法以加快搜索过程  
it will use sort with filter to speed up the search operation each iteration  
![image](https://github.com/chenhuaizhen/Puzzle/raw/master/image/6.jpg)

最终将第一个到达终点的作为输出  
finally pick up the first one who finish the game as the ouput  
![image](https://github.com/chenhuaizhen/Puzzle/raw/master/image/7.jpg)

更多细节详见main.js  
the more details are in main.js  
[main.js](https://github.com/chenhuaizhen/Puzzle/blob/master/js/main.js)
