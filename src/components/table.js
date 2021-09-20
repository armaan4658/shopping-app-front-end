import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Table } from '@material-ui/core';
export const TableComponent = ({data}) => {
    return(
        <>
            <Paper style={{width:'100%'}}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order Id</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Contact no</TableCell>
                                        <TableCell>Payment</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map(d=>(
                                        <>
                                        <TableRow>
                                            {Object.keys(d).map(k=>(
                                                k!=="userId" && k!=="time" && k!=="items" && k!=="__v"? (
                                                    <TableCell> {d[k]} </TableCell>
                                                ) : ''
                                            ))}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Item details</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Name</TableCell>
                                                            <TableCell>Color</TableCell>
                                                            <TableCell>Size</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                    {d.items.map(it=>(
                                                        <TableRow>
                                                            {Object.keys(it).map(itk=>(
                                                                itk!=="thumbnail" && itk!=="id" && itk!=="price"? (
                                                                    <TableCell> {it[itk]} </TableCell>
                                                                ) : ''
                                                            ))}
                                                        </TableRow>
                                                    ))}
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                        </TableRow>
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
        </>
    )
}