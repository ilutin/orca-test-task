import styled from 'styled-components'

export const StyledFilter = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  & .multi-select {
    position: absolute;
    width: 200px;

    & .dropdown-container {
      border: 0;
      color: ${({ theme }) => theme.colors.textColor};
      box-shadow: none;
      background-color: ${({ theme }) => theme.colors.taskBg};

      & .dropdown-heading {
        & svg {
          color: ${({ theme }) => theme.colors.icon};
        }

        /* & .dropdown-search-clear-icon {
          display: none;
        } */
      }

      & .select-panel {
        background-color: ${({ theme }) => theme.colors.primary};

        & .search input {
          color: ${({ theme }) => theme.colors.textColor};
        }

        & ul li .select-item {
          background-color: ${({ theme }) => theme.colors.primary};

          &.selected,
          &:hover {
            color: ${({ theme }) => theme.colors.icon};
            background-color: ${({ theme }) => theme.colors.secondary};
          }
        }

        & input[type='checkbox'] {
          display: none;
        }
      }
    }
  }
`
