//package com.ssafy.myname.service;
//
//import org.springframework.stereotype.Service;
//
//import java.io.*;
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class ProfanityFilter {
//
//    private void computeLPSArray(String pat, int M, int lps[]) {
//        int length = 0;
//        int i = 1;
//        lps[0] = 0;
//
//        while (i < M) {
//            if (pat.charAt(i) == pat.charAt(length)) {
//                length++;
//                lps[i] = length;
//                i++;
//            } else {
//                if (length != 0) {
//                    length = lps[length - 1];
//                } else {
//                    lps[i] = 0;
//                    i++;
//                }
//            }
//        }
//    }
//
//    private boolean KMPSearch(String pat, String txt) {
//        int M = pat.length();
//        int N = txt.length();
//
//        int lps[] = new int[M];
//        int j = 0;
//
//        computeLPSArray(pat, M, lps);
//
//        int i = 0;
//        while (i < N) {
//            if (pat.charAt(j) == txt.charAt(i)) {
//                j++;
//                i++;
//            }
//            if (j == M) {
//                return true;
//            } else if (i < N && pat.charAt(j) != txt.charAt(i)) {
//                if (j != 0) {
//                    j = lps[j - 1];
//                } else {
//                    i = i + 1;
//                }
//            }
//        }
//        return false;
//    }
//
//    public boolean filterProfanity(String allMsgs, InputStream filterFileStream) {
//        List<String> words = new ArrayList<>();
//        try (BufferedReader br = new BufferedReader(new InputStreamReader(filterFileStream))) {
//            String line;
//            while ((line = br.readLine()) != null) {
//                words.add(line);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        boolean isProfanityDetected = false;
//        for (String word : words) {
//            if (KMPSearch(word, allMsgs)) {
//                System.out.println("'" + word + "' 단어가 검출되었습니다.");
//                isProfanityDetected = true;
//            }
//        }
//
//        if (!isProfanityDetected) {
//            System.out.println("부적절한 단어 사용이 검출되지 않았습니다.");
//        }
//
//        return isProfanityDetected;  // 검출 결과 반환
//    }
//}