import styled from 'styled-components';

// export const StyledProfile = styled.div`
// `

export const EmailEntry = styled.div`
    margin: auto;
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
    margin: auto;
    padding: 2rem;
    box-shadow: 1px 1px 30px 3px #eaeaea;
    background: #fff;
    border-radius: 2rem;

    .section {
        width: 100%;
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

    textarea {
        width: 100%;
        margin: 1rem;
        height: 200px;
        resize: none;
        white-space: pre-wrap;
    }

    .bio {
        white-space: pre-wrap;
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