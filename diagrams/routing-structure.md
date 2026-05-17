# Routing Structure Diagram

```mermaid
flowchart LR
    R[/]
    RP[/projects]
    RPC[/projects/:category]
    RPD[/project/:slug]
    RCS[/case-studies]
    RCSD[/case-study/:slug]
    RB[/blog]
    RBD[/blog/:slug]
    RNF[/404]

    R --> RP
    R --> RCS
    R --> RB
    RP --> RPC
    RP --> RPD
    RCS --> RCSD
    RB --> RBD
    RBD --> RB
    RPC --> RP
    RPD --> RP
```
