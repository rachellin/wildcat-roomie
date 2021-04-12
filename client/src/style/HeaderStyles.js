import styled from 'styled-components';

// export const StyledProfile = styled.div`
// `

// export const StyledFilters = styled.div`
//     .filter {
//         border-radius: 1rem;
//         padding: 0.5rem 1rem;
//         margin-right: 1rem;
//         background: #b3a2d3;
//         display: inline-block;

//         :hover {
//             cursor: pointer;
//         }
//     }
// `

export const StyledFilterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-family: 'Karla', sans-serif;
    position: sticky;
    top: 0;
    padding: 2rem 0 1rem 0;
    background: #fafafa;
    z-index: 999;
`;

export const StyledFilters = styled.div`
    .filter {
        display: block;
        padding: 0.5rem 1rem;
        min-width: 7.5rem;

        :hover {
            cursor: pointer;
            background: #b3a2d3;
        }
    }
`

export const StyledDropdown = styled.div`
    z-index: ${props => props.overflow == "hidden" ? "0" : "99999"};
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    background: #b3a2d3;
    height: 2rem;
    overflow: ${props => props.overflow};
    text-align: center;

    :hover {
        cursor: pointer;
    }

    span {
        display: block;
        margin-bottom: 0.5rem;
    }
`

