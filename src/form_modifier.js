import React, { Component } from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBBtn,MDBInput, MDBFooter } from "mdbreact";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";


class form_update extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voitures: {
                id: 0,
                nomVoiture: '',
                sieges: '',
                infocomp: '',
                telephone: ''
          }
        }
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/api/voiture/update/5d1231a20d6e1949e8aa9130')
          .then(res => res.json())
          .then(voiture => this.setState({ voiture: voiture.result.id }))
      }
    
      handleChange = e => {
        const name = e.target.name;
        this.setState({ [name]: e.target.value });
      }
    
      handleUpdateVoiture = () => {
        const voiture = {
          id: this.state.id,
          nomVoiture: this.state.nomVoiture,
          sieges: this.state.sieges,
          infocomp: this.state.infocomp,
          telephone: this.state.telephone
        };
    
        const voitureupdated = this.state.voitures.map(car => {
          if (car.id === this.state.id) {
            return voiture;
          } else return car;
        });
    
        this.setState(() => ({
          voitures: voitureupdated,
          nomVoiture: '',
          sieges: '',
          infocomp: '',
          telephone: '',
          create: true
        }));
      };
    
      handleDelete = e => {
        this.setState({
          voitures: this.state.voitures.filter(function(car) {
            if (car.id !== e.target.id) return car;
          })
        });
      };
    
      // handleEdit = e => {
      //   const voiture = this.state.voitures.find(function(car) {
      //     if (car.id === e.target.id) {
      //       return car;
      //     }
      //   });
      //   this.setState({
      //     id: car.id,
      //     nomVoiture: car.nomVoiture,
      //     sieges: car.sieges,
      //     infocomp: car.infocomp,
      //     telephone: car.telephone,
      //   });
      // };




    render() {
    const { voitures } = this.state;
    
        return (
           <div className="container-fluid cover-container d-flex">
          <div className="row col-12 align-items-center justify-content-center flex-fill mx-auto ">
            <form  onSubmit={this.handleSubmit} className="mx-auto" >
            
              <div className="form-group col-12">
                <MDBInput type="text" label="Nom de la voiture"icon="car" className="mb-0" name="nomVoiture" value={voitures.nomVoiture}  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col-12">
                <MDBInput type="number" label="Sieges" icon="chair" className="mb-0" name="sieges" value={voitures.sieges} onChange={this.handleChange} />
              </div>
              <div className="form-group col-12 flex">
                <MDBInput type="text" label="Infos complémentaires" icon="pen" className="mb-0"name="infocomp" value={voitures.infocomp} onChange={this.handleChange} />
              </div>
              <div className="form-group col-12">
                <MDBInput type="text" label="Téléphone" icon="phone" className="mb-0" name="telephone" value={voitures.telephone} onChange={this.handleChange} />
              </div>
              <div className="text-center">
                <MDBBtn className="btn btn-block text-uppercase mt-5" color="primary" onClick={voitures.handleUpdateVoiture}   >Mise à jour</MDBBtn>
              </div>         
                <h6 className="text-center text-uppercase mt-5">Lieu de rendez-vous</h6>
              <div className="form-group col-12">
                <MDBInput type="text" label="Adresse" icon="map-marker-alt" className="mb-0" name="adresse" value={voitures.adresse} onChange={this.handleChange} />
              </div>
              <div className="md-form form-group col-12">
              <MDBInput type="date" icon="calendar" className="mb-2 textbox-n" name="date" value={voitures.date} onChange={this.handleChange} />
              </div>
              <div className="md-form form-group col-12">
              <MDBInput type="time" icon="clock" className="mb-2" name="heure" value={voitures.heure} onChange={this.handleChange} />
              </div>
              
              <div className="text-center mt-2">
                <MDBBtn className="text-uppercase text-white" type="cancel" color="mdb-color">Annuler</MDBBtn>
                <Link to="/Evenement"> 
                  <MDBBtn className="text-uppercase text-white" type="submit" color="primary">Creer</MDBBtn>
                </Link>
              </div>
              <MDBBtn className="btn btn-block text-uppercase mt-5" color="danger" onClick={this.handleDelete} id={voitures.id}>Supprimer</MDBBtn>
            </form>        
          </div>
        </div>
        );
    }
}

export default form_update;