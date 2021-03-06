import React, { Component } from 'react';
import api from '../api';
import './Device.css'
import imgClose from './img/close.png';
import imgSearch from './img/history.png';
import imgMore from './img/next.png';

export default class App extends Component {

    state = {
        isRunning: 'START',
        values: {
            flag: true
        }
    }

  async monitor() {
    while (true) {
        const res = await api.get(`http://localhost:8080/start/${this.props.id}`);

        if (res.data.data === false) {
            alert("Couldn't connect to device");
            break
        }

        this.setState({
            values: res.data.data
        });
        if (this.state.isRunning === 'START') break;
    }
  }

  start = (event) => {
    if (this.state.isRunning === 'START') {
        event.target.style.background = "#ff802b";
        this.setState({
            isRunning: 'STOP'
        });

        this.monitor();

    } else {
        event.target.style.background = "#b8d9ff";
        this.setState({
            isRunning: 'START'
        });

        // this.state.worker.terminate();

        api.post(`http://localhost:8080/stop/${this.props.id}`);

    }
  }

  expandir = (id) => {
      console.log(id);
  }

  render() {
    return (
        <div className="Device">
            <div className="content">
                <div className="title">
                    <img src={require(`./img/${this.props.img}`)} alt={this.props.name}/>
                    <h1>{this.props.name}</h1>
                </div>
                <div className="values">
                    <div className="Props">
                        <ul>
                        {
                            this.props.pdu.attribute.map(attribute => (
                                <li key={this.props.pdu.attribute.indexOf(attribute)}>
                                    <p>{attribute}</p>
                                    <p>{this.state.values.flag ? '0' : this.state.values[attribute]}</p>
                                </li>
                            ))
                        }
                        </ul>
                    </div>

                    <div className="Search">
                        <div className="BtnSearch">
                            <img src={imgSearch} alt="Search"/>
                            <p>Search</p>
                        </div>
                        <input type="date"/>
                    </div>
                </div>

                <div className="btnStart">
                    <button className="Start" onClick={this.start}>
                        {this.state.isRunning}
                    </button>
                </div>
            </div>
            <div className="expand">
                <div className="Close">
                    <img src={imgClose} alt="Close"/>
                </div>
                <div className="btnExpand">
                    <img src={imgMore} alt="Expand" onClick={this.expandir(this.props.id)}/>
                </div>
            </div>
        </div>
    );
  }
}
