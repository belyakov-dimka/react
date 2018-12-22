import React, { Component } from 'react';

const Article = props => {
    return(
        <div className="article">
            <div className="title">{props.data.title} </div>
            <div className="body"> {props.data.body}</div>
            <div className="num">{props.data.id} </div>
            <button onClick={() => { props.changeVisibilityInPosts(props.data.id)}}>Прочитано</button>

        </div>
    )
}

class News extends Component {
    constructor(props) {
        super(props)
        this.state={

            posts:[]

        }
    }
    changeVisibilityInPosts =(value)=>{
       let inv = this.state.posts.findIndex(a => a.id===value)
        let x = this.state.posts
        x.splice(inv,1)

        this.setState({posts:x})

    }


    renderingNews() {
        let template = null
        template = this.state.posts.map((item,index)=> {
            //item.visible=true
            return <Article key={index} data={item} changeVisibilityInPosts={this.changeVisibilityInPosts} />}
        )
        return template
    }
    sortNewsAZ=()=>{
    this.setState({posts:this.state.posts.sort((a,b)=> a.title > b.title )})
    }
    sortNewsZA=()=>{
        this.setState({posts:this.state.posts.sort((a,b)=> a.title < b.title )})
    }
    sortNewsId=()=>{
        this.setState({posts:this.state.posts.sort((a,b)=> a.id > b.id )})
    }
    issetNews = ()=>{
       if (this.state.posts.length===0){
           return 'Больше ничего нет'
       }
    }

    render() {
            let lng = this.state.posts.length;
        return (
            <div className='list'>
                <h2>Новости</h2>

                <div className={lng===0 ? 'nopost' : 'therepost'}>
                <div className="tabs">
                    <button onClick={this.sortNewsAZ}>Отсортировать по алфавиту A-Z</button>
                    <button onClick={this.sortNewsZA}>Отсортировать по алфавиту Z-A</button>
                    <button onClick={this.sortNewsId}>Отсортировать по Новизне</button>
                </div>
                </div>
                {this.renderingNews()}
                <div className="nomore">{this.issetNews()}</div>

            </div>
        );
    }
    componentDidMount(){
        let postarray = null
        let requestURL = 'https://jsonplaceholder.typicode.com/posts';
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = ()=> {
            postarray = request.response;
            this.setState ({posts:postarray.splice(0,10)})
        }

    }
}

export default News;
