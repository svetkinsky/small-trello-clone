import * as $ from 'jquery'
import Post from '@models/Post'
import json from './assets/data'
import './styles/styles.css'
import logo from '@/assets/logo'
import xml from '@/assets/data.xml'
import csv from './assets/data.csv'
import './styles/less.less'
import './styles/scss.scss'
import './babel'
import React from 'react'
import { render } from 'react-dom'


const post = new Post("Webpack POST Title", logo)

// console.log("Post: ", post)
// console.log('Data JSON: ', json)
// console.log('Data XML:', xml)
// console.log('Data CSV: ', csv)

$('pre').addClass('code').html(post.toString());

const App = () => (
    <div class="container">
        <h1>Config Webpack</h1>

        <hr />
        <div class="logo" />
        <hr />
        <pre />
        <hr />
        <div class="box">
            <h2>Less</h2>
        </div>
        <div class="card">
            <h2>SCSS</h2>
        </div>
    </div>
)

render(<App />, document.getElementById('app'))
