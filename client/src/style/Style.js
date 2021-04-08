import styled from 'styled-components';

// export const StyledProfile = styled.div`
// `

export const EmailEntry = styled.div`
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
`

export const EntryContainer = styled.div`

    .nav {
        position: fixed;
        margin: 2rem;

        button {
            display: block;
            font-size: 1.5rem;
            border-radius: 2rem;
            padding: 1.5rem;
            margin: 1rem;
            background: lightpink;
        }
    }
`

export const EntryForm = styled.form`
    border: 1px solid #eee;
    width: 50vw;
    margin: auto;
    padding: 2rem;

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
        max-height: 200px;
        overflow-y: scroll;
        resize: none;
    }

    .bio {
        //display: flex;
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