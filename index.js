console.log(new Date());
const axios = require('axios');
const cheerio = require('cheerio');

let config = {
  headers: {
    // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    // origin: 'https://www.insightsonindia.com',
    // 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
};
let url = 'https://www.insightsonindia.com/wp-admin/admin-ajax.php';
// let data = {
//   action: 'wp_pro_quiz_admin_ajax',
//   func: 'quizLoadData',
//   data: { quizId: 2 },
// };
let data = 'action=wp_pro_quiz_admin_ajax&func=quizLoadData&data%5BquizId%5D=2';

axios
  .post(url, data)
  .then((resp) => {
    //console.log(resp.data);
    const $ = cheerio.load(resp.data.content);
    console.log($('.wpProQuiz_listItem').length);
    $('.wpProQuiz_listItem').each((i, e) => {
      let q = {};
      q.question = $(e).find('.wpProQuiz_question_text').html().trim();
      console.log(q);
    });
  })
  .catch((err) => console.error(err));

//const $ = cheerio.load('<h2 class="title">Hello world</h2>');

// $('h2.title').text('Hello there!');
// $('h2').addClass('welcome');

// $.html();

//console.log($('.title').text());
