import styled from 'styled-components';

// export const StyledProfile = styled.div`
// `

export const EntryContainer = styled.form`

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
        width: 50%;
        margin: 1rem;
        height: 5rem;
    }

    .bio {
        display: flex;
    }
`