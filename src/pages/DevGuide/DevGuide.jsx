import React from 'react'

import Footer from '../../components/layout/Footer/Footer'
import Header from '../../components/layout/Header/Header'
import Hero from '../Landing/components/Hero'
import Buttons from './Buttons/Buttons'
import Colors from './Colors/Colors'
import GreyScaleColors from './Colors/GreyScaleColors'
import SystemColors from './Colors/SystemColors'
import Fonts from './Fonts/Fonts'

export default function DevGuide() {
  return (
    <>
      <Header />
      <Hero title="Dev Guide" />
      <div className="container">
        <section>
          <h3>Brand Colors</h3>
          <Colors />
          <hr />
        </section>
        <div className="row margin-y">
          <div className="col-6">
            <h3 className="margin-bottom-sm">Primary Fonts</h3>
            <Fonts />
          </div>
          <div className="col-6">
            <h3 className="margin-bottom-sm">System Colors</h3>
            <SystemColors />
            <h3 className="margin-top margin-y-sm">Primary Fonts</h3>
            <GreyScaleColors />
            <h3 className="margin-top margin-y-sm">
              Buttons and Call to Actions
            </h3>
            <Buttons />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
