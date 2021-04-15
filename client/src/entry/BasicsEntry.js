import React from 'react';
import 'remixicon/fonts/remixicon.css'

export class BasicsEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basics: this.props.basics,
            social: this.props.social,
            image: this.props.image,
            imageFile: null,
            newImg: false
        }
    }

    updateData(category, target, value) {
        let copy = this.state[category];
        copy[target] = value;
        this.setState({ [category]: copy }, () => {
            let data = this.state[category];
            //console.log(data)
            this.props.updateData(category, data);
        });
    }

    handleUpload(e) {
        if (this.state.image != null) {
            this.setState({ newImg: true });
        } // ???
        this.props.updateData("img", e.target.value);
        this.fileToDataUri(e.target.files[0])
            .then(base64 => {
                this.setState({
                    image: base64,
                    imageFile: e.target.files[0]
                })
            })
        // this.setState({ 
        //     //image: URL.createObjectURL(e.target.files[0]),
        //     image: this.fileToDataUri(e.target.files[0]),
        //     imageFile: e.target.files[0]
        // });

    }

    fileToDataUri = (file) => new Promise((resolve, reject) => {
        // const reader = new FileReader();
        // reader.onload = (event) => {
        //   resolve(event.target.result)
        // };
        //reader.readAsDataURL(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })

    uploadImg = (e) => {
        e.preventDefault();

        // if replacing an image, delete image first
        if (this.state.newImg) {
            this.imgurDelete(this.props.imageDelete);
        }

        const formData = new FormData();
        formData.append('type', 'file')

        this.fileToDataUri(this.state.imageFile)
            .then(result => {
                //const fix = result.split(',')[1].replace(/\+/g, '/').replace(/_/g, '/').replace(/\-/g, '/'); // wait so i need this?
                return result.split(',')[1];
            })
            .then(blob => {
                formData.append('image', blob);
                return formData;
            })
            .then(formData => {
                console.log(formData)
                this.imgurPost(formData);
            })
    }

    imgurPost(formData) {
        fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                'Authorization': `Client-ID ${process.env.REACT_APP_CLIENTID}`,
            },
            body: formData
        })
        .then(res => {
            if (res.status == 200) {
                return res.json();
            } else {
                console.log("error", res.status);
                return res.json();
            }
        })
        .then(data => {
            // save data.data.link and data.data.deletehash
            // should check that there is no error before calling handleImg
            if (data.status == 200) {
                this.props.handleImg({
                    link: data.data.link,
                    deleteHash: data.data.deletehash
                }, false);
                //this.props.setEntryMsg("profile picture saved!");
                return data;
            } else {
                //this.props.setEntryMsg(data.data.error);
                this.props.handleImg({
                    error: data.data.error
                })
                console.log(data.data.error);
                return data;
            }
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }

    imgurDelete(deleteHash) {
        fetch(`https://api.imgur.com/3/image/${deleteHash}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Client-ID ${process.env.REACT_APP_CLIENTID}`,
            },
        })
        .then(res => {
            if (res.status == 200) {
                return res.json();
            } else {
                console.log("error", res.status);
                return res.json();
            }
        })
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }

    render() {
        return (
            <>
                <div class="section img-preview">
                    <img className="img-preview" src={this.state.image}/>
                    <input type="file" onChange={e => this.handleUpload(e)}/>
                    <button onClick={this.uploadImg}>save image</button>
                </div>

                <div class="section">
                    <div class="form-group">
                        <label for="first-name" className="required">first name</label>
                        <input 
                            type="name" name="first-name" placeholder="Jane" 
                            onChange={e => this.props.updateData("firstName", e.target.value)}
                            value={this.props.firstName}
                            required/>
                    </div>
                    <div class="form-group">
                        <label for="last-name" className="required">last name</label>
                        <input 
                            type="name" name="last-name" placeholder="Doe" 
                            onChange={e => this.props.updateData("lastName", e.target.value)}
                            value={this.props.lastName}
                            required/>
                    </div>
                    <div class="form-group">
                        <label for="pronouns" className="required">pronouns</label>
                        <input 
                            type="text" name="pronouns" placeholder="she/her" 
                            onChange={e => this.updateData("basics", "pronouns", e.target.value)}
                            value={this.props.basics.pronouns}
                            required/>
                    </div>
                </div>

              <div class="section">
                    <div class="form-group">
                        <label for="location" className="required">location</label>
                        <input 
                            type="text" name="location" placeholder="NYC"
                            onChange={e => this.updateData("basics", "location", e.target.value)}
                            value={this.props.basics.location}
                            required/>
                    </div>
                    <div class="form-group">
                        <label for="major" className="required">major</label>
                        <input 
                            type="text" name="major" placeholder="computer science"
                            onChange={e => this.updateData("basics", "major", e.target.value)}
                            value={this.props.basics.major} 
                            required/>
                    </div>

                </div>

              <div class="section">
                <div class="form-group">
                    <label for="phone">phone</label>
                    <input 
                        type="text" name="phone" placeholder="phone number"
                        onChange={e => this.updateData("social", "phone", e.target.value)}
                        value={this.props.social.phone}/>
                </div>
                <div class="form-group">
                    <label for="instagram">instagram</label>
                    <input 
                        type="text" name="instagram" placeholder="username only, no @"
                        onChange={e => this.updateData("social", "ig", e.target.value)}
                        value={this.props.social.ig}/>
                </div>
                <div class="form-group">
                    <label for="snapchat">snapchat</label>
                    <input 
                        type="text" name="snapchat" placeholder="username only, no @"
                        onChange={e => this.updateData("social", "snap", e.target.value)}
                        value={this.props.social.snapchat}/>
                </div>
              </div>

              <div className="group" style={{marginLeft: "1.5rem"}}>
                <div className="option">
                    <input 
                        type="checkbox" name="roommate" id="roommate"
                        onChange={e => this.props.updateData("roommate", !this.props.roommate)}
                        checked={this.props.roommate}/>
                    <label for="roommate">looking for a roommate</label>
                </div>
              </div>

            </>
        )
    }
}