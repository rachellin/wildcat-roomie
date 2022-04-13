import styled from 'styled-components';
//import "./animations.css";

// export const StyledProfile = styled.div`
// `

// should this be moved to headerstyles
export const StyledContainer = styled.div`
    width: 65vw;
    margin: 0 auto 5rem auto;
    //text-align: center;

    @media (max-width: 1200px) {
        width: 80vw;
    }

    .header {
        position: relative;
        top: 0;
        display: block;
        padding: 1rem 0 2rem 0;
        background: #fafafa;

        @media (max-width: 600px) {
            text-align: center;
        }

        a {
            margin-right: 1.5rem;
            background: transparent;
        }

        i {
            display: inline-block;
            margin: 0 0 1rem 1rem;
        }

        h1 {
            display: inline-block;
            margin-bottom: 1rem;
        }
    }

    .authenticate {
        display: flex;
    }

`

export const StyledProfileCont = styled.div`
    position:relative;
    display:grid;
    padding:0 10px 10vh 10px;
    grid-gap:70px;
    grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) );
    justify-content:center;
    justify-items:center;
`

export const StyledCard = styled.div`
    //position: relative;
    background: #fff;
    padding: 2rem;
    width: 250px; /* temp */
    height: 250px;

    margin: 2rem;
    border-radius: 2rem;
    box-shadow: 1px 1px 30px 3px #eaeaea;
    text-align: center;

    :hover {
        cursor: pointer;
    }

    img {
        border-radius: 50%;
        display: block;
        margin: auto;
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
`

export const StyledProfile = styled.div`
    position: fixed;
    width: 70vw;
    //height: 62vh;
    max-height: 95vh;
    transform: translateX(-50%) translateY(-50%);
    top: 50%;
    left: 50%;
    background: #fff;
    padding: 2rem;
    border-radius: 2rem;
    opacity: ${props => props.opacity};
    animation: ${props => props.opacity == 1 ? "fadeIn" : "fadeOut"} 1s;
    z-index: 99999;

    @media (max-width: 1200px) {
        width: 80vw;
    }

    .close {
        i {
            float: right;
            font-size: 1.5rem;
        }
        
        :hover {
            cursor: pointer;
        }
    }

    img {
        object-fit: cover;
        border-radius: 2rem;
        width: 125px;
        height: 125px;
    }

    .side {
        float: left;
        width: 200px;
        margin-right: 2rem;

        .basics, .social-media {
            span {
                display: block;
            }
        }

        .basics {
            padding-bottom: 1rem;
            border-bottom: 1px solid #eee;
            margin-bottom: 1rem;
        }

        .roommate-label {
            margin: 1.5rem 0 0 0;
            font-size: 13px;
            padding: 0.75rem;
            background: #BCDAF6;
            border-radius: 2rem;
            text-align: center;
        }
    }

    .bio-filters {
        span {
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            background: rgb(199, 187, 227, 0.5);
            margin: 0 1rem 1rem 0;
            display: inline-block;
        }

        margin: 1rem 0 0 200px;
        padding-bottom: 1rem;
        border-bottom: 1px solid #eee;
        width: calc(65vw - 200px - 4rem);
    }

    .bio {
        display: flex;

        > div {
            flex: 50%;
        }  

        p {
            overflow-y: scroll;
            max-height: 40vh;
        }

        // .looking-for, .about {
        //     width: 50%;
        // }

        .about {
            padding: 0 1.5rem 0 0;
        }

        .looking-for {
            padding: 0 1.25rem;
        }

        h1 {
            font-size: 1.3rem;
        }
       
    }
`

export const Overlay = styled.div`
    background: rgb(0, 0, 0, ${props => props.opacity});
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 99999;
`