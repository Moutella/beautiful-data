const d3 = window.d3

export class BeautifulData {
  constructor(params) {
    this.params = params;
    this.svg = null;
    this.margins = null;


    this.circles = []

    this.createSvg();
    this.createMargins();
    Object.entries(this.params.style).forEach(([key, value]) => {
      this.svg.style(key, value);
    });
    this.createAxisBase()
  }

  createSvg() {
    this.svg = d3.select(this.params.selector)
      .append("svg")
      .attr('x', this.params.position_x || 0)
      .attr('y', this.params.position_y || 0)
      .attr('width', this.params.width + this.params.left + this.params.right)
      .attr('height', this.params.height + this.params.top + this.params.bottom)

    this.svg.append("text")
      .attr("transform",
        "translate(" + (this.params.width / 2 + this.params.left) + " ," +
        (this.params.height + this.params.top + 40) + ")")
      .style("text-anchor", "middle")
      .text(this.params.label_x);

    this.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", this.params.left - 40)
      .attr("x", 0 - (this.params.height / 2 + this.params.top))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(this.params.label_y);

  }

  createMargins() {
    this.margins = this.svg
      .append('g')
      .attr("transform", `translate(${this.params.left || 0},${this.params.top || 0})`)
  }

  createAxisBase() {

    if (this.params.type == 'barchart') {
      this.y = d3.scaleLinear().range([this.params.height, 0]);
      this.yAxis = this.margins.append("g")
      this.x = d3.scaleBand().range([0, this.params.width])
      this.xAxis = this.margins.append("g").attr("transform", "translate(0," + this.params.height + ")")
    } else if (this.params.type == 'scatterplot' || this.params.type == 'linechart') {
      this.y = d3.scaleLinear().range([this.params.height, 0]);
      this.yAxis = this.margins.append("g")
      this.x = d3.scaleLinear().range([0, this.params.width])
      this.xAxis = this.margins.append("g").attr("transform", "translate(0," + this.params.height + ")")
    }
  }

  updateData(data) {
    if (this.params.type == 'barchart') {
      this.bins = data;
      let yExtent = d3.extent(this.bins, d => {
        return d.value;
      });
      this.maxValue = yExtent[1]
      this.x.domain(this.bins.map(d => d.label));
      this.y.domain([0, yExtent[1]]).nice();
    } else if (this.params.type == 'scatterplot') {
      this.circles = data
      let yExtent = d3.extent(this.circles, d => {
        return d.cy;
      });
      let xExtent = d3.extent(this.circles, d => {
        return d.cx;
      });
      if (this.params.extra.start_minimum_value_x) {
        this.x.domain(xExtent).nice();
      } else {
        this.x.domain([0, xExtent[1]]).nice();
      }
      this.y.domain([0, yExtent[1]]).nice();
    } else if (this.params.type == 'linechart') {
      this.data = data
      let yExtent = d3.extent(this.data, d => {
        return d.y;
      });
      let xExtent = d3.extent(this.data, d => {
        return d.x;
      });
      this.x.domain(xExtent).nice();
      this.y.domain(yExtent).nice()

    }

    this.render();
  }

  render() {

    this.yAxis.transition().duration(this.params.duration || 2000).call(d3.axisLeft(this.y))
    this.xAxis.transition().duration(this.params.duration || 2000).call(d3.axisBottom(this.x))
    if (this.params.type == 'barchart') {
      this.margins.selectAll('rect')
        .data(this.bins)
        .join('rect')
        .transition()
        .duration(this.params.duration || 2000)
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
          return this.params.height / this.maxValue * d.value;
        })
        .attr('y', d => {
          let y = this.params.height - this.params.height / this.maxValue * d.value;
          return y;
        })
        .style('fill', d => d.fill || this.params.extra.fill || '#ffffff')
    } else if (this.params.type == 'scatterplot') {
      this.margins.selectAll('circle')
        .data(this.circles)
        .join('circle')
        .transition()
        .duration(this.params.duration || 2000)
        .attr('cx', d => this.x(d.cx))
        .attr('cy', d => this.y(d.cy))
        .attr('r', d => d.r || 1)
        .attr('fill', d => d.fill || this.params.extra.fill || '#ffffff');
    } else if (this.params.type == 'linechart') {

      let u = this.margins.selectAll(".lineTest")
        .data([this.data], function (d) {
          return d.x
        });
      // Updata the line
      u
        .enter()
        .append("path")
        .attr("class", "lineTest")
        .merge(u)
        .transition()
        .duration(3000)
        .attr("d", d3.line()
          .x(d => this.x(d.x))
          .y(d => this.y(d.y)))
        .attr("fill", "none")
        .attr("stroke", this.params.extra.stroke || '#ffffff')
        .attr("stroke-width", 2.5)


    }

  }

}