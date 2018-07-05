import React, { Component } from 'react'

class Header extends Component {
  render() {
    const bgColor = this.props.bgColor || 'transparent'
    const headerText = this.props.headerText || 'Template Text'
    return (
      <header style={{ backgroundColor: bgColor }}>
        <h1>{headerText}</h1>
      </header>
    )
  }
}

export default Header