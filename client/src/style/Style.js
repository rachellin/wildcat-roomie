import styled from 'styled-components';

// export const StyledProfile = styled.div`
// `

export const EmailEntry = styled.div`
    margin: 2rem auto;
    width: 200px;
    text-align: center;

    label {
        font-weight: 600;
        font-size: 1.3rem;
        font-family: 'Karla', sans-serif;
    }
`

export const EntryContainer = styled.div`
    //border: 1px solid lightblue;
    .nav {
        position: fixed;
        top: 50%;
        left: 8rem;
        transform: translateY(-50%);
        border-radius: 2rem;
        width: 150px;
        text-align: center;

        button {
            display: block;
            font-size: 1.5rem;
            padding: 1.5rem;
            margin: 1rem;
            background: transparent;
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

        img {
            margin: auto;
            border-radius: 50%;
            width: 100px;
            height: 100px;
            border: 1px solid #eee;
            object-fit: cover;
        }
    }

    textarea {
        width: 100%;
        margin: 1rem;
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