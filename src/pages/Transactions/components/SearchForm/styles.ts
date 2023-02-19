import styled from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    padding: 1rem;
    background-color: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    border: 0;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button {
    display: flex;
    align-items: center;

    gap: 0.75rem;
    padding: 1rem;
    font-weight: bold;

    border: 0;
    border-radius: 6px;

    background: transparent;
    color: ${(props) => props.theme['green-300']};
    border: 1px solid ${(props) => props.theme['green-300']};

    transition: all ease 0.3s;

    &:hover {
      background: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      border: 1px solid ${(props) => props.theme['green-500']};
    }
  }
`
