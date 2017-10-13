import React from 'react';
import './product.css'
import ProductList from './productList.json';
import _ from 'lodash';

export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.sum = this.sum.bind(this);
        this.state = {mapping:[],sum: 0, sumPrice: 10};
    }
    sum(arr) {
        let sum = 0
        arr.forEach((item) => {
            item.forEach(i => {
                sum = sum + i.input
            })
        });
        this.setState({ sum })
        console.log(sum)
    }
    onChange(e) {
        let value = Number(e.target.value);
        let stock = Number(e.target.id);
        let key = e.target.dataset;
        if (value > stock) {
            e.target.value = "";
            alert('超出库存')
        }
        let newData = this.state.mapping;
        newData[key.row][key.col].input = value;
        // let sum = _.sum(newData, (item) => item.input)
        console.log(this.sum(newData))
        this.setState({newData})
    }
    componentDidMount() {
        this.setState({mapping: ProductList.mapping})
    }
    render() {
        console.log(this.state)
        const size = ["S", "M", "L"];
        const color =["red", "green", "blue"];
        const t = _.result(_.find(ProductList.mapping, function(chr) {
            return chr["color"] === "红";
        }), 'number');
        console.log(t)
        return(
            <div className="product">
                <div className="product_image">
                    <img src={ProductList.image} alt=""/>
                </div>
                <div className="product_title">
                    <span>{ProductList.title}</span>
                    <span>{ProductList.price}</span>
                    <div>
                        <span>货号</span><span>{ProductList.number}</span><span>品牌</span><span>{ProductList.brand}</span>
                    </div>
                </div>
                <div className="product_info">
                    <div>商品信息</div>
                    <div>
                        <span>颜色</span><span>{ProductList.color}</span>
                    </div>
                    <div>
                        <span>尺码</span><span>{ProductList.size}</span>
                    </div>
                </div>
                <div className="cover">
                    <div className="product_detail">
                        <div className="product_buy">
                            <div>
                                <span>立即下单</span><span>每单{ProductList.price}</span>
                            </div>
                            <div>
                                <div className="product_table_th">
                                    <div>尺码</div>
                                    <div>S</div>
                                    <div>M</div>
                                    <div>L</div>
                                </div>
                                {
                                    this.state.mapping.map((item,key) => <div className="product_table_tr" key={key}>
                                        <div>{item[key]["color"]}</div>
                                        {
                                            item.map((ite, k) =>
                                                <input name={key} data-row={key} data-col={k} onChange={this.onChange} key={k} className="product_table_item" type="number" id={ite.number} placeholder={`库存:${ite.number}`} />)
                                        }
                                    </div>)
                                }
                                <div className="product_result">
                                    <span>合计</span><span>{this.state.sum}件</span><span>总价</span><span>￥{this.state.sumPrice * this.state.sum}</span>
                                     <button>立即下单</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
