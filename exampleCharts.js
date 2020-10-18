import {
  BeautifulData
} from './beautifulData.js'

async function bar_chart_function() {



  bar_chart.addData([10, 20, 30, 40, 23]);
  bar_chart.render();

}
let bar_chart = new BeautifulData(
  '#barchart',
  'barchart',
  800,
  400,
  200,
  200,
  'Xis',
  'Ipsiloni', {
    'background-color': '#aaffaa',
    'border': '.5rem solid #a0a0a0'
  }, {
    relative_thickness: 0.5,
    fill: '#ffaaaa'
  }

);
bar_chart_function(bar_chart);


jQuery("#new_data").on("click", function () {
  console.log("hmm");
  bar_chart.addData(
    Array.from({
      length: 5
    }, () => Math.floor(Math.random() * 100))
  );
  bar_chart.updateFill(`#${Math.floor(Math.random()*16777215).toString(16)}`)
  bar_chart.render()
});

jQuery("#new_params").on("click", function () {
  bar_chart.update_params(
    Math.random() * 800,
    Math.random() * 400,
    Math.random() * 400,
    Math.random() * 200,
    'Xis',
    'Ipsiloni', {
      'background-color': `#${Math.floor(Math.random()*16777215).toString(16)}`,
      'border': `.5rem solid #${Math.floor(Math.random()*16777215).toString(16)}`
    }, {
      relative_thickness: 0.5,
      fill: '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
  )
});