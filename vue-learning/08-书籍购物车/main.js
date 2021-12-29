const app = new Vue({
  el: '#app',
  data: {
    list: [],
    books: [
      {
        id: 1,
        name: '《算法导论》',
        date: '2006-9',
        price: 85.00,
        count: 1
      },
      {
        id: 2,
        name: '《UNIX编程艺术》',
        date: '2006-2',
        price: 59.00,
        count: 1
      },
      {
        id: 3,
        name: '《编程珠玑》',
        date: '2008-10',
        price: 39.00,
        count: 1
      },
      {
        id: 4,
        name: '《代码大全》',
        date: '2006-3',
        price: 128.00,
        count: 1
      },
    ]
  },
  methods: {
    // 方法一,价格保留两位小数
    // getFinalPrice(price){
    //   return '$'+ price.toFixed(2);
    // }
    increment(index) {
      this.books[index].count++;
    },
    decrement(index) {
      // if (this.books[index].count > 0) {
      this.books[index].count--;
      // }
    },
    remove(index) {
      //从index开始删除一个元素
      //不是集合不能用remove()
      this.books.splice(index, 1);
    }
  },
  computed: {
    totalPrice() {
      //stream api
      return this.books.map(a => a.price * (a.count)).reduce((x, y) => x + y);
    }
  },
  filters: {
    //方法二过滤器, 自动会将|（管道符之前的对象当成参数传入该方法）
    showPrice(price) {
      return '$' + price.toFixed(2);
    },

  }
})