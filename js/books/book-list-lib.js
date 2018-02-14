{/* function Star(props) {
	const itemId = props.bookid + "star" + props.value;
	return (
		<div>
			<input type="radio" id={itemId} name={props.bookid} value={props.value} />
			<label htmlFor={itemId}></label>
		</div>
	);
}

function StarList(props) {
	const starNums = Array.apply(null, {length: props.rating}).map(
        (x, y) => y + 1
    );
	const listItems = starNums.map((number) =>
		<Star 
            key={number.toString()} 
            bookid={props.bookid}
			value={number} />
	);
	return (
		<div className="rating">
			{listItems}
		</div>
	);
}
*/}


{/* class StarList extends React.Component {
  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
} */}

class StarList extends React.Component {
    constructor(props) {
        super(props);
        //this.focusTextInput = this.focusTextInput.bind(this);
        setPercentage(status.rating * 100 / status.starTotal);
    }
	
    status = {
		rating     : this.props.rating,
		starTotal  : 5.0,
		step       : 5,
		percentage : 0
	}
    
    outerDivId = this.props.bookid + "stars";
    outerDiv = null;

    content = (<div 
        id={this.outerDivId} 
        className="stars-outer" 
        onMouseMove={this.changeStars(event)} 
        onMouseOut={this.revert} 
        onDblClick={this.setRating}
        ref={divRef => { 
        	this.outerDiv = divRef; 
        }}
        >
        <div className="stars-inner"
            style = {`width : ${status.percentage.toString(10)}%`}
        ></div>
    </div>);

	setPercentage(newPercentage){
		if (newPercentage < 0) newPercentage = 0;
		if (newPercentage > 100) newPercentage = 100;
		const starPercentage = Math.round(newPercentage / status.step) * status.step;
		status.percentage = starPercentage;
	}


// 	function showStars(){
// 		document.querySelector(`#rating-num`).innerHTML = (percentage * starTotal / 100).toFixed(2); 
// 		document.querySelector(`#rating .stars-inner`).style.width = `${percentage.toString(10)}%`;
// 	}
	
	changeStars(event) {
		const rect = this.outerDiv.getBoundingClientRect();
		setPercentage((event.clientX - rect.left) * 100 / rect.width) 
	}
		
	revert(){
		setPercentage(rating * 100 / starTotal);
	}
		
	setRating(){
		rating = (percentage * starTotal / 100).toFixed(2);
	}

	render() { 
        return content;
    }
}


function Book(props) {
   
	const itemId = `book${props.book.id}`;
	const imgName = props.book.image;
	const imgFile = `images/${props.book.image}`;
	const visible1 = [1].includes(props.view) ? "visible" : "hidden";
	const visible3 = [3].includes(props.view) ? "visible" : "hidden";
	const visible13 = [1, 3].includes(props.view) ? "visible" : "hidden";
    function addToWhishList(id) {
        whishList.add(id);
	}
    function addToByeList(id) {
        buyList.add(id);
	}
	function showDescription(){
		const modal = document.getElementById('myModal');
		const modcontent = document.getElementsByClassName('about')[0];
		modcontent.innerHTML=" I like this book";
		modal.style.display = "block";
	}
	return (
		<div className="book" id={itemId}>
			<a href="#" onClick={showDescription}><img src={imgFile} alt={imgName}/></a>
			<p className="bookName"><a href="#">{props.book.name}</a></p>
			<p>by <a href="#">{props.book.author}</a></p>
			<StarList bookid={itemId} rating={props.book.rating} /><br />
            <p className={visible13}>Price: {props.book.price}</p>
            <button 
                id = {`btn${props.book.id}`}
                className={visible1} 
                type="button"
                onClick={addToWhishList(props.book.id)}
                >Add to whishlist</button>
			<input 
                id = {`chk${props.book.id}`}
                className={visible3} 
                type="checkbox"
                onClick={addToWhishList(props.book.id)} />
		</div>
	);
}

function BookList(props) {
	console.log(props.view);
	function closeModal(){
		const modal = document.getElementById('myModal');
		modal.style.display = "none";
	}
	const listItems = props.books.map((book) =>
		<Book
			key={book.id.toString()}
            view={props.view}         
			book={book} />
	);
	return (
		<div className="wholeblock">
			{listItems}
			<div id="myModal" className="modal">
				<div className="modal-content">
					<span className="close" onClick={closeModal}>&times;</span>
					<p className="about">Something about this book..</p>
				</div>
			</div>
		</div>
	);
}

function bookListRun(list, view){
    const books = <BookList books={list} view={view} />;
    ReactDOM.render(
        books, 
        document.getElementById("bookList")
    );
}

