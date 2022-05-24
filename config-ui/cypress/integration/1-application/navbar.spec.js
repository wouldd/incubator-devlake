/*
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements.  See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/// <reference types="cypress" />

context('Navbar', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows merico github icon link', () => {
    cy.get('.navbar')
      .should('have.class', 'bp3-navbar')
      .find('a[href="https://github.com/apache/incubator-devlake"]')
      .should('be.visible')
      .and('have.class', 'navIconLink')
  })

  it('shows merico email icon link', () => {
    cy.get('.navbar')
      .should('have.class', 'bp3-navbar')
      .find('a[href="mailto:hello@merico.dev"]')
      .should('be.visible')
      .and('have.class', 'navIconLink')
  })

  it('shows merico discord icon link', () => {
    cy.get('.navbar')
      .should('have.class', 'bp3-navbar')
      .find('a[href="https://discord.com/invite/83rDG6ydVZ"]')
      .should('be.visible')
      .and('have.class', 'navIconLink')
  })
})