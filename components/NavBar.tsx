// components/NavBar.tsx
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const Nav = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  padding: 0;
`;

const NavItem = styled.li`
  position: relative;
  margin: 0 10px;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const DropdownMenu = styled.ul<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #444;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1000;

  li {
    padding: 8px 12px;

    &:hover {
      background-color: #555;
    }
  }
`;

const links = [
  { cardinal: 24, prefixes: ["J24", "S24", "F24"] },
  { cardinal: 23, prefixes: ["J23", "S23", "F23_1", "F23_2"] },
  { cardinal: 22, prefixes: ["J22", "S22", "F22"] },
  { cardinal: 21, prefixes: ["J21", "F21"] },
  { cardinal: 20, prefixes: ["J20"] },
];

const NavBar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleDropdown = (key: string) => {
    setDropdownVisible((prev) => (prev === key ? null : key));
  };

  const hideDropdown = () => {
    setDropdownVisible(null);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Nav>
      <NavList>
        <NavItem>
          <Link href="/" passHref>
            <NavLink>Home</NavLink>
          </Link>
        </NavItem>
        {links.map(({ cardinal, prefixes }) => (
          <NavItem key={cardinal}>
            <NavLink onClick={() => toggleDropdown(`${cardinal}`)}>
              {cardinal}기
            </NavLink>
            <DropdownMenu visible={dropdownVisible === `${cardinal}`}>
              {prefixes.map((prefix) => (
                <li key={`${prefix}${cardinal}`}>
                  <Link href={`/${prefix}`} passHref>
                    <NavLink onClick={hideDropdown}>{`${prefix}`}</NavLink>
                  </Link>
                </li>
              ))}
            </DropdownMenu>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};

export default NavBar;