import React, { Component } from 'react';
import loadingImage from './loading.svg';
import './Loading.scss'
class Loading extends Component {

  render() {

    const style = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: 'none',
      background: 'none',
      zIndex: 800000
    }

    return (
      <div style={style}>
        <svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
          <circle cx="170" cy="170" r="160" stroke="#E2007C" />
          <circle cx="170" cy="170" r="135" stroke="#404041" />
          <circle cx="170" cy="170" r="110" stroke="#E2007C" />
          <circle cx="170" cy="170" r="85" stroke="#404041" />
        </svg>
        <span className="text-light">
          در حال بارگذاری
        </span>
        {/* <img src={loadingImage} alt="loading" /> */}
      </div>

    )

  }
}

export default Loading