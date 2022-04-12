const currencyFormat = (num) => {
    new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(num);
 }
 export default currencyFormat;