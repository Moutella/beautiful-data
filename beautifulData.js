const d3 = window.d3

export class BeautifulData {
  constructor(params) {
    this.params = params;
    this.svg = null;
    this.margins = null;

    this.xScale = null;
    this.yScale = null;

    this.circles = []

    this.createSvg();
    this.createMargins();
    Object.entries(this.params.style).forEach(([key, value]) => {
      this.svg.style(key, value);
    });
  }

  createSvg() {
    this.svg = d3.select(this.params.selector)
      .append("svg")
      .attr('x', this.params.position_x || 0)
      .attr('y', this.params.position_y || 0)
      .attr('width', this.params.width + this.params.left + this.params.right)
      .attr('height', this.params.height + this.params.top + this.params.bottom);
  }

  createMargins() {
    this.margins = this.svg
      .append('g')
      .attr("transform", `translate(${this.params.left || 0},${this.params.top || 0})`)
  }

  createScales() {
    if (this.type == 'barchart') {
      let yExtent = d3.extent(this.bins, d => {
        return d.value
      });
      console.log(yExtent);
      this.yScale = d3.scaleLinear().domain(yExtent).nice().range([0, this.height]);

    }

  }

  createAxis() {
    let yAxis = d3.axisLeft(this.yScale)
      .ticks(15);
    this.svg.append("g")
      .call(yAxis);
  }

  addData(data) {
    this.bins = data;
    this.y = d3.extent(this.bins, d => d.value);
  }

  createScales() {
    if (this.params.type == 'barchart') {
      let yExtent = d3.extent(this.bins, d => {
        return d.value;
      });
      this.bins.map(d => console.log(d.label))
      this.yScale = d3.scaleLinear().domain([0, yExtent[1]]).nice().range([this.params.height, 0]);
      this.xScale = d3.scaleBand().domain(this.bins.map( d => d.label)).range([0, this.params.width])
      
    } else {
    }

  }

  createAxis() {
    if (this.params.type == 'barchart') {
      let yAxis = d3.axisLeft(this.yScale)
        .ticks(15);

      this.margins.append("g")
        .attr("transform", "translate(0," + this.params.height + ")")
        .call(d3.axisBottom(this.xScale));

      this.margins
        .append("g")
        .call(yAxis);
    }



  }

  render() {
    console.log(this.y);
    if (this.params.type == 'barchart') {
      this.margins.selectAll('rect')
        .data(this.bins)
        .join('rect')
        .transition()
        .duration(2000)
        .attr('width', () => {
          let width = (this.params.width) / this.bins.length //centralizar tabela
          width *= this.params.extra.relative_thickness || 1; //diminuir grossura
          return width;
        })
        .attr('x', (d, i) => {
          let x = i * (this.params.width) / this.bins.length
          x += (this.params.width / this.bins.length) / 2 * (1 - this.params.extra.relative_thickness || 1);
          return x
        })
        .attr('height', d => {
          return this.params.height / this.y[1] * d.value;
        })
        .attr('y', d => {
          let y = this.params.height - this.params.height / this.y[1] * d.value;
          return y;
        })
        .style('fill', this.params.extra.fill || '#ffffff')
    } else {
      this.margins.selectAll('circle')
        .data(this.circles)
        .join('circle')
        .attr('cx', d => this.xScale(d.cx))
        .attr('cy', d => this.yScale(d.cy))
        .attr('r', d => d.r)
        .attr('fill', d => this.colScale(d.col));
      // .attr('fill', d => this.catScale(d.cat));
    }

  }

  updateFill(color) {

  }
  updateData() {

  }


}