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

export const StyledFilters = styled.div`
    .filter {
        display: block;
        margin-bottom: 0.5rem;

        :hover {
            cursor: pointer;
            background: #b3a2d3;
        }
    }
`

export const StyledDropdown = styled.div`
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    background: #b3a2d3;
    display: inline-block;
    height: 2rem;
    overflow: ${props => props.overflow};
    text-align: center;
    width: 7.5rem;

    :hover {
        cursor: pointer;
    }

    span {
        display: block;
        margin-bottom: 0.5rem;
    }
`

