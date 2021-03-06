//实现二叉查找树，特殊的二叉树，左小右大
//定义node类，参数是数据，左节点右节点；
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.show = show;
}

function show() {
  return this.data;
}

//二叉查找树
function BST() {
  this.root = null; //根节点
  this.insert = insert; //插入
  this.inOrder = inOrder; //中序
  this.preOrder = preOrder; //先序
  this.postOrder = postOrder; //后序
  this.getMin = getMin; //找最小节点
  this.getMax = getMax; //最大节点
  this.find = find; //给定值查找
}

//插入方法
function insert(data) {
  let n = new Node(data, null, null);
  if (!this.root) { //root不存在
    this.root = n; //初始化root
  } else {
    let current = this.root; //让root根节点为当前节点
    let parent; //父节点
    while (true) {
      parent = current; //默认吧当前节点赋值给父节点
      if (data < current.data) { //如果要插入的数据小于当前节点
        current = current.left //就让当前节点的向左下走
        if (!current) { //如果当前节点不存在，
          parent.left = n; //让父节点指向插入的n
          break;
        }
      } else {
        current = current.right; //就让当前节点的向右下走
        if (!current) { //不存在
          parent.right = n;
          break;
        }
      }
    }
  }
}

//中序遍历，得到的数据是升序排列，先左下然后左下父节点，然后右，数据升序 用递归实现
//回忆下递归树，从上到底，然后到达递归边界，然后执行表达式向上
function inOrder(node = this.root) { //默认参数
  if (node) {
    inOrder(node.left);
    console.log(node.show() + ' ');
    inOrder(node.right);
  }
}
// 二叉树的中序遍历
// var inorderTraversal = function(root) {
//   let res=[],stack=[]
//   //逻辑参考前序，变化就是中序遍历，出栈的时候一定有val
//   while(stack.length||root){
//     if(root){
//       stack.push(root)
//       root=root.left
//     }else{
//       root= stack.pop()
//       res.push(root.val)
//       root= root.right
//     }
//   }
//   return res
// };

//先序遍历 遍历当下的
function preOrder(node) {
  if (node) {
    console.log(node.show() + ' ');
    preOrder(node.left);
    preOrder(node.right);
  }
}
//先序遍历 非递归形式，用栈代替 leetCode
// var preorderTraversal = function (root) {
//   let stack = [], res = []
//   if (root === null) return res
//   //模仿递归，先左遍历完后右
//   while (stack.length || root) {
//     // 判断先左后右
//     if (root) {
//       res.push(root.val)
//       stack.push(root)
//       root = root.left
//     } else {
//       root = stack.pop()
//       root = root.right
//     }
//   }
//   return res
// };

//后序遍历，先到左下，然后对应的右下，然后父节点
function postOrder(node) {
  if (node) {
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.show() + ' ');
  }
}
//后序遍历非递归，这个比较困难，关键点有判断头节点再入栈和记录访问过的结点
// var postorderTraversal = function(root) {
//   let res = [],stack=[],prev=null //prev指向刚访问过的结点
//   while(stack.length || root){
//     if(root){
//       stack.push(root)
//       root = root.left
//     }else{
//       root=stack.pop()
//       if(root.right === null || root.right === prev){ //判断
//         prev = root
//         res.push(root.val)
//         root=null //跳出
//       }else{
//         stack.push(root) //把【1，2，3】中的1又加入到栈了
//         root=root.right
//       }
//     }
//   }
//   return res
// };

// inorder 测试
let nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);
console.log('inorder traversal:');
nums.inOrder();
console.log('------ preOrder');
preOrder(nums.root);
console.log('------ postOrder');
postOrder(nums.root);

//查找的方法
//查找最小值，二叉排序树性质可以得出，最小为最左侧节点
function getMin(current = this.root) {
  // let current = this.root;
  console.log(current, '111')
  while (current.left) {
    current = current.left;
  }
  return current;
}

//查找最大值，二叉排序树性质可以得出，最小为最右侧节点
function getMax() {
  let current = this.root;
  while (current.right) {
    current = current.right;
  }
  return current.data;
}

//查找给定值 二叉查找树性质查
function find(data) {
  let current = this.root;
  while (current) {
    // console.log(current,'222')
    if (current.data === data) {
      return current;
    } else if (data < current.data) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return null;
}

//从二叉排序树删除节点
// 1 如果没有子节点，直接删除就行
//2 如果只有一个子节点，原本指向他的要换位置
//3 两个子节点，要么查找带删除节点左子树最大值，要么查右子树最小值
function remove(data) {
  root = removeNode(this.root, data);
}

//参数data为待删除数据，node默认是根节点
//函数返回删除的节点，然后打印二叉树是删除后的二叉树
//用chrome控制台看思路
function removeNode(node, data) {
  if (!node) { //空树
    console.log('!node')
    return null;
  }
  if (data === node.data) {
    console.log('data===nodedata')
    //没有子节点的节点
    if (!node.left && !node.right) {
      return null
    }
    //没有左节点的
    if (!node.left) {
      return node.right;
    }
    // 没有右节点的
    if (!node.right) {
      return node.left;
    }
    //两个节点的,本程序按照查右子树的最小值来
    let tempNode = getMin(node.right); //找到右子树的最小节点
    node.data = tempNode.data; //找到右子树最小节点后，赋值给删除的当前节点
    node.right = removeNode(node.right, tempNode.data); //向右赋值寻找
    console.log(' node.right1')
    return node;
  } else if (data < node.data) {
    node.left = removeNode(node.left, data);
    console.log(' node.left')
    return node;
  } else { //向右下走类似查找那个
    node.right = removeNode(node.right, data);
    console.log(' node.right2', node.right)
    return node;
  }
}

//测试
console.log('------ getMin');
// nums.getMin()
// console.log(nums.root)
console.log(getMin(nums.root), nums.getMin())
console.log(nums.getMax())
console.log(nums.find(22), 'find',)
console.log('------ remove');
console.log(removeNode(nums.root, 23))
//详细解释下removeNode(nums.root,23)，二叉树中序为3，16，22，23，45，37，99删除节点值为23的过程
//删除23，1：从根节点开始查找删除的数值等于节点值，然后判断此节点有无子节点
// 2：当前节点有子节点，且左右子树都存在，查找右子树的最小子节点，保存
// 3：赋值给要删除的节点，当前状态要删除的已删除，但是右最小子树还未删除，然后向右递归查找，并且把要删除的data换成最小右子节点的
// 4：当前来到了初始要删除的右子节点，判断与data的大小，然后递归寻找
// 5：找到后，根据边界值，左子树，右子树没有，左右都没有，返回相应的节点
// 6：把返回的结点给予正确的指针，向右查找，返回后的肯定也是node.right指向，这样就正确了
// 7：递归结束，二叉排序树删除节点完成 推荐结合Chrome的控制台，打断点看算法流程

//计数，在node节点中加入count记录当前节点的频率见p120
