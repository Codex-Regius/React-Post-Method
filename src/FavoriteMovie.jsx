import React from 'react';

import './FavoriteMovie.css'

class FavoriteMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      poster: '',
      comment: '',
    }
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount = () => {
    fetch('https://post-a-form.herokuapp.com/api/movies/')
    .then(res => console.log(res))
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
  }
  
  handlePost = () => {

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    };

    const url = "https://post-a-form.herokuapp.com/api/movies/";

    fetch(url, config)
    .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.error) {
          alert(res.error);
        } else {
          alert(`Your movie ${res.title} has been added`);
        }
      }).catch(e => {
        console.error(e);
        alert("Erreur lors de l'ajout d'un employé");
      });
  }

  render(){
    return(
      <div className="FavoriteMovie">
        <h1>Your favorite movie</h1>

        <form onSubmit={this.submitForm}>
          <fieldset>
            <legend>Informations</legend>
            <div className="form-data">
              <label htmlFor="title">Movie Title</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={this.onChange}
                value={this.state.title}
              />
            </div>

            <div className="form-data">
              <label htmlFor="poster">Url image</label>
              <input
                type="text"
                id="poster"
                name="poster"
                onChange={this.onChange}
                value={this.state.poster}
              />
            </div>

            <div className="form-data comment">
              <label htmlFor="comment">Comments</label>
              <input
                type="text"
                id="comment"
                name="comment"
                onChange={this.onChange}
                value={this.state.comment}
              />
            </div>
            <hr />
            <div className="form-data">
              <input type="submit" value="Envoyer" onClick={this.handlePost} />
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default FavoriteMovie;