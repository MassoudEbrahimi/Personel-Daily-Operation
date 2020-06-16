import React, { Component, Fragment } from 'react';
import $ from 'jquery'

import './Headers.css'
class Headers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date(),
            date: new Date().toLocaleDateString()
        }
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
        // ---------Responsive-navbar-active-animation-----------
        function test() {
            var tabsNewAnim = $('#navbarSupportedContent');
            var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
            var activeItemNewAnim = tabsNewAnim.find('.active');
            var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
            var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
            var itemPosNewAnimTop = activeItemNewAnim.position();
            var itemPosNewAnimLeft = activeItemNewAnim.position();
            $(".hori-selector").css({
                "top": itemPosNewAnimTop.top + "px",
                "left": itemPosNewAnimLeft.left + "px",
                "height": activeWidthNewAnimHeight + "px",
                "width": activeWidthNewAnimWidth + "px"
            });
            $("#navbarSupportedContent").on("click", "li", function (e) {
                $('#navbarSupportedContent ul li').removeClass("active");
                $(this).addClass('active');
                var activeWidthNewAnimHeight = $(this).innerHeight();
                var activeWidthNewAnimWidth = $(this).innerWidth();
                var itemPosNewAnimTop = $(this).position();
                var itemPosNewAnimLeft = $(this).position();
                $(".hori-selector").css({
                    "top": itemPosNewAnimTop.top + "px",
                    "left": itemPosNewAnimLeft.left + "px",
                    "height": activeWidthNewAnimHeight + "px",
                    "width": activeWidthNewAnimWidth + "px"
                });
            });
        }
        $(document).ready(function () {
            setTimeout(function () { test(); });
        });
        $(window).on('resize', function () {
            setTimeout(function () { test(); }, 500);
        });
        $(".navbar-toggler").click(function () {
            setTimeout(function () { test(); });
        });
    }
    componentWillMount() {
        clearInterval(this.timerID)
    }
    tick() {
        this.setState({ time: new Date() })
    }
    render() {
        const {time,date} = this.state
        return (
            <Fragment>
                <nav class="navbar navbar-expand-lg navbar-mainbg">
                    <a class="navbar-brand navbar-logo" href="#"></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-bars text-white"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{ direction: "rtl" }}>
                        <ul class="navbar-nav ml-auto mr-4">
                            <div class="hori-selector"><div class="left"></div><div class="right"></div></div>
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:void(0);"><i class="mdi mdi-plus-box-multiple m-1 p-1"></i>جدید</a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" href="javascript:void(0);"><i class="mdi mdi-content-paste m-1 p-1"></i>فعالیت</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:void(0);"><i class="mdi mdi-database m-1 p-1"></i>Wbs</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:void(0);"><i class="mdi mdi-pipe-wrench m-1 p-1"></i>پروژه</a>
                            </li>
                            {/* <li class="nav-item">
                                <a class="nav-link" href="javascript:void(0);"><i class="fa fa-joomla"></i>پروژه</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:void(0);"><i class="fa fa-plus"></i>جدید</a>
                            </li> */}
                        </ul>
                        <span className="userName" style={{ margin: "auto" }}>{date}<span className="mdi mdi-calendar-month mr-2" /></span>
                        <span className="userName mdi mdi-" style={{ margin: "auto" }}>{time.toLocaleTimeString()}<span className="mdi mdi-clock mr-2" /></span>
                        <span className="userName" style={{ margin: "auto" }}><span className="mdi mdi-account-circle ml-2" />مسعود ابراهیمی</span>
                        <ul className="navbar-nav ml-5">
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:void(0);"><i class="mdi mdi-exit-to-app m-1 p-1"></i>خروج</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Fragment>
        );
    }
}

export default Headers;