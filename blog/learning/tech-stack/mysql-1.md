# 单表查询

### 1.1 查询表中所有的行与列

> desc table_name 查看表结构

```
SQL> desc  emp

Name      Type          Nullable   Default   Comments
------    --------      ---------  --------  --------
EMPNO     NUMBER(4)     Y                    编码
ENAME     VARCHAR2(10)  Y                    名称
...
```

> select * from table_name 返回目标表中所有的列

```
SQL> SELECT * FROM emp;

EMPNO    ENAME     JOB      MGR    ...
-----    -----     ----     -----
323      SMITH     CLERK    7902
455      JONES     ANALYST  9800
...
```

### 1.2 从表中检索部分行

> where 条件 查看公司多少销售人员

```
SQL> SELECT * FROM emp WHERE job = 'SALESMAN';

EMPNO    ENAME     JOB         MGR    ...
-----    -----     ----        -----
323      SMITH     SALESMAN    7902
455      JONES     SALESMAN    9800
...
```
### 1.3 查询空值

> 查询某一列为空的数据, 比如返回提成(comm)为空的数据:

```
SQL> SELECT * FROM emp WHERE comm = NULL;

no rows selected

```

==实际上, NULL是不能用“=”运算符的, 需要使用Mysql提供的运算符:==

- IS NULL
- IS NOT NULL
- <=> : 比较运算符, 当=左右两边都为NULL时, 返回true.

```
// 正确做法如下

SQL> SELECT * FROM emp WHERE comm IS NULL;

EMPNO    ENAME     JOB         comm    ...
-----    -----     ----        -----
323      SMITH     SALESMAN    
...
```

### 1.4 空值与运算

==实际上,NULL不支持加,减,乘,除,大小比较,相等比较,否则只能为空==


### 1.5 查找满足多个条件的行

> 查找组合条件, 如: 逻辑表达式(部门10的员工 OR 所有得到提成的员工 OR (工资 <= 2000 and 部门号=20)

```
SELECT *
  FROM EMP
 WHERE (DEPTNO = 10
        OR COMM IS NOT NULL
        OR (SAL <= 200 AND DEPTNO = 20));
EMPNO     ENAME   JOB       SAL     COMM    DEPTNO
-----     -----   ----      ----    ----    ------
763       JONES   SALESMAN  800     300     20
889       LILY    CLERK     2300            10
...
```

### 1.6 从表中检索部分列

> 查询表中部分列信息

```
SQL> SELECT empno, ename, hiredate FROM emp WHERE deptno = 10;

EMPNO   ENAME   HIREDATE    SAL
-----   -----   --------    ----
7790    JONES   2018-09-10  2450
8000    JAMES   2018-11-11  2000
...
```
### 1.7 为列取别名

> 使用as 或者直接在列名后跟别名

```
SQL> SELECT Host '主机名', User '用户名' FROM USER

// or

SQL> SELECT Host as '主机名', User as '用户名' FROM USER

主机名      用户名
------     ------
localhost   root
localhost   mysql
...
```

### 1.8 在WHERE子句中引用取别名的列

> 引用别名时千万别忘记嵌套一层, 因为这个别名在SELECT之后才有效

```
SQL> SELECT *
     FROM (SELECT sal AS '工资', comm AS '提成' FROM emp) x
     WHERE sal < 1000;
工资        提成
-----      --------
800         
900
...
```

### 1.9 拼接列

> 使用字符串连接函数 CONCAT()

CONCAT(str1, str2...), 返回结果为连接参数产生的字符串.

注意:

1. 如果任意一个参数为NULL,则返回值为NULL
2. 如果所有参数均为非二进制字符串, 则结果为非二进制字符串;
3. 如果自变量中含任意二进制字符串, 则结果为一个二进制字符串;
4. 一个数字参数会被转化为二进制字符串格式, 为了避免可以使用显式类型cast

```
SQL> SELECT CONCAT('主机名: ', Host, ', 姓名: ',  User) AS '用户信息' FROM user

用户信息
----------------
主机名:localhost, 姓名: mysql.sys
主机名:localhost, 姓名: root
...

-----------------------------------------------

SQL> SELECT CONCAT('主机名: ', Host, ', 姓名: ',  User, NULL) AS '用户信息' FROM user

用户信息
-----------------
NULL
NULL
...
```

> 使用CONCAT_WS(separator, str1, str2...)

```
SQL> SELECT CONCAT_WS('!', '主机名', Host, '姓名', NULL, User) AS '用户信息' FROM user

用户信息
-------------------
主机名!localhost!姓名!mysql.sys
主机名!localhost!姓名!root
...

// 注意, 存在NULL值时,返回值不为NULL,而是被忽略
```

> 使用group_concat函数, 将组合中的列数据拼接

group_concat([DISTINCT] propName [ORDER BY ASC/DESC propName] [SEPARATOR '分隔符'])

```
SQL> SELECT id, group_concat(name separator ';') from aa group by id;

1 | 10;20;20
2 | 20
...

-----------------------------------
// 去重

SQL> SELECT id, group_concat(distinct name separator ';') from aa group by id;

1 | 10;20
2 | 20
...

// 去除name列的重复数据后使用;符号拼接
```

> 使用repeat()函数

repeat(str, times)

```
SQL> SELECT repeat(User, 2) from user

rootroot
mysqlmysql
...
```

> 向某字端追加字符串

```
SQL> UPDATE table_name set field=CONCAT(field, '', str);
```

#### 参考内容

- [Oracle查询优化改写2.0(技巧与案例)](https://book.douban.com/subject/30253259/)
- [MySql - w3cshool](https://www.w3cschool.cn/mysql/mysql-tutorial.html)