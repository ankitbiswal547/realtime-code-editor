import React from 'react';
import Form from '../../components/Form/Form';

const Home = () => {

    return (
        <div className='homePage-wrapper'>
            <div className='homePage-container'>
                <img className='logo' src="https://res.cloudinary.com/ankitcloudinary/image/upload/v1648222469/real%20time%20code%20editor/code_along_logo-cropped_zj36tq.webp" alt='code along logo'></img>
                <div className='tagline'>&quot;The Realtime Code Editor&quot;</div>
                <div className='paste-info'>Paste invitation room id here</div>
                <Form />
            </div>

            <footer>
                Built with &#10084;&#65039; by <a target="blank" href='https://www.linkedin.com/in/ankit-biswal-46b66a192/'>Ankit Biswal</a>
            </footer>
        </div>
    )
}

export default Home;