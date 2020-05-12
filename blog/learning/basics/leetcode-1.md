# 两数之和 (easy)

## 题目描述

给定一个整数数组 ```nums``` 和一个目标值 ```target```，请你在该数组中找出和为目标值的那 **两个** 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

**测试用例**:

```
给定 nums = [2, 7, 11, 15], target = 9

output: [0, 1]
// 因为 nums[0] + nums[1] = 2 + 7 = 9

```

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {

};
```

## 解题思路

循环遍历数组, 当前数据与之前遍历过的数据相加是否为target, 如果有则返回下标组, 否则继续遍历;

亟待解决的问题:

1. 如何遍历, 用什么方法, 性能方面的考虑?
2. 记录遍历过的数据, 如何记录, 记录什么样的数据?
3. 假定唯一输出, 使用**差值计算**, 提升性能, 无需计算剩余数据;

## 参考答案

1. 使用循环遍历方法: for、forEach、for..of、for...in、map...;
2. 使用键值对的方式记录遍历过的数据, 用obj或map

性能对比:

```
for > for...of > forEach > for..in > map
```

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
    const visited = {}
    for(let i = 0; i < nums.length; i += 1) {
        const dif = target - nums[i] // 求差值

        if (visited[dif] !== undefined) {
            return [visited[dif], i] // 返回答案
        }

        visited[nums[i]] = i // 记录遍历过的键值对
    }
};
```

也可以用map的方式:

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
    const map = new Map()
    for(let i = 0; i < nums.length; i += 1) {
        const dif = target - nums[i] // 求差值

        if (map.has(dif)) {
            return [map.get(dif), i] // 返回答案
        }

        map.set(nums[i], i) // 记录遍历过的键值对
    }
};
```

