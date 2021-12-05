import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { enumRoutes } from '../../context/AppReducer'

const IMAGE_SIZE = 100
export default function ErrorView(props) {
    const { statusCode, title, svg } = props
    if (!statusCode) return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' >
            <Stack spacing={2}>
                <Box display='flex' alignItems='end' justifyContent='center'>
                    <Box display='block' width='40vh' minHeight='100' position='relative' overflow='hidden'>
                        <Image src={`/${statusCode}_illustration.svg`} alt='error illustration' width="100%" height="50%" layout="responsive" objectFit="contain" />
                    </Box>
                </Box>
                <Typography mt={-2} textAlign='center' variant='h6' >Maaf, terjadi kesalahan pada Client</Typography>
            </Stack>
            <Link href={enumRoutes.LANDING} passHref >
                <Button variant='outlined' >Kembali ke halaman utama</Button>
            </Link>
        </Box>
    )
    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' >
            <Stack spacing={4} mb={4}>
                {svg ? (
                    <Box display='flex' alignItems='end' justifyContent='center'>
                        <Box display='block' width='40vh' minHeight='100' height='auto' position='relative' overflow='hidden'>
                            {svg}
                        </Box>
                    </Box>
                ) : (
                    <Box display='flex' alignItems='end' justifyContent='center'>
                        <Box display='block' width='40vh' minHeight='100' position='relative' overflow='hidden'>
                            <Image src={`/${statusCode}_illustration.svg`} alt='error illustration' width="100%" height="50%" layout="responsive" objectFit="contain" />
                        </Box>
                    </Box>
                )}
                <Typography textAlign='center' variant='h6' color='primary' >{title}</Typography>
                {statusCode !== 'offline' && (
                    <Typography textAlign='center' variant='body2' >Status Code {statusCode}</Typography>
                )}
            </Stack>
            <Link href={enumRoutes.LANDING} passHref >
                <Button variant='outlined' >Kembali ke halaman utama</Button>
            </Link>
        </Box>
    )
}
