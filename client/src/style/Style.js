import styled from 'styled-components';

export const EmailEntry = styled.div`
    margin: 2rem auto;
    width: 200px;
    text-align: center;

    label {
        font-weight: 600;
        font-size: 1.3rem;
        font-family: 'Karla', sans-serif;
    }
    
    input[type="submit"] {
        margin: 1rem auto;
    }

    @media (min-width: 999px) {
        .mobile-msg {
            display: none;
        }
    }
`

export const EntryContainer = styled.div`
    //border: 1px solid lightblue;
    .nav {
        position: fixed;
        top: 50%;
        left: 8rem;
        transform: translateY(-40%);
        border-radius: 2rem;
        width: 150px;
        text-align: center;

        button {
            display: block;
            font-size: 1.5rem;
            padding: 1.5rem;
            margin: 1rem;
            background: transparent;

            :hover {
                color: #999;
            }
        }

    }
`

export const StyledTabs = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 150px;
    height: 100%;
    text-align: center;
    vertical-align: middle;

    button {
        display: block;
        font-size: 1.5rem;
        padding: 1.5rem;
        background: ${props => props.color};
        height: 100%;
        width: 100%;
        border-radius: 0;

        :hover {
            color: #999;
            background: lightblue;
        }
    }
`

export const EntryForm = styled.form`
    border: 1px solid #eee;
    width: 50vw;
    margin: 2rem auto;
    padding: 2rem;
    box-shadow: 1px 1px 30px 3px #eaeaea;
    background: #fff;
    border-radius: 2rem;

    .delete-check {
        z-index: 99999;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2rem;
        background: #fff;
        text-align: center;
        border-radius: 2rem;

        button {
            margin: 0 1rem;
        }
    }

    .section {
        width: 100%;
        padding-right: 2rem;
        display: flex;
        flex-direction: row;

        .form-group {
            flex-grow: 1;
            margin: 0 1rem;
        }

        label, input {
            display: block;
            width: 100%;
        }

    }

    .img-preview {
        display: block;
        text-align: center;
        width: 300px;
        margin: auto;

        div {
            position: relative;
            margin-bottom: 1rem;
            height: 100px;

            img {
                position: absolute;
                border-radius: 50%;
                width: 100px;
                height: 100px;
                left: 50%;
                transform: translateX(-50%);
                border: 1px solid #eee;
                object-fit: cover;
            }
    
            button.choose-file {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                margin: 0;
                opacity: 0;
            }

            :hover button.choose-file {
                opacity: 0.8;
            }
        }

    }

    textarea {
        width: 100%;
        margin: 1rem 5rem 1rem 0;
        height: 200px;
        resize: none;
    }

    .group{
        width: 50%;
        padding: 0.5rem;

        label, input {
            display: inline-block;
            margin: 0;
        }

        .option {
            display: block;
        }

        :hover {
            cursor: pointer;
        }
    }
`
export const StyledFilterEntry = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const StyledEditor = styled.div`
    margin: 2rem 1rem 0 0; // TODO: fix 
    //border: 1px solid #eee;

    .editor {
        border: 1px solid #eee;
        outline: none;
        font-size: 15px;
        padding: 1rem;
        border-radius: 2rem;
        margin: 1rem 0 0 0;
    }
`

export const StyledFeedback = styled.div`
    ol, ul {
        margin-top: 0.5rem;
    }

    h3 {
        margin: 2rem 0 0.5rem 0;
    }
`