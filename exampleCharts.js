window.onload = () => {


  let bar_chart = new BeautifulData(
    '#barchart',
    800,
    600,
    'Xis',
    'Ipsiloni', {
      'background-color': '#aaeeff',
      'border': '.5rem solid #aaaaff'
    }
  );
  bar_chart.randomDots(55);
  let b2ar_chart = new BeautifulData(
    '#scatterplot',
    800,
    600,
    'Xis',
    'Ipsiloni', {
      'background-color': '#ffaaee',
      'border-radius': '5rem',
      'border': '.5rem solid #ffaaaa'
    });

  let line_chart = new BeautifulData(
    '#linechart',
    800,
    600,
    'X',
    'Y',
    {
      'background-color': '#aaffaa',
      'border-radius': '5rem',
      'border': '.5rem solid #eeffaa'
    }
  )
}